import { Backdrop, Button, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextareaAutosize, Typography, withStyles } from '@material-ui/core';
import React , {Component} from 'react';
import { Redirect } from 'react-router';
import {getAllUsers,sendEmail} from '../../api/api-admin';
import Header from '../HeaderComponent';
import CircularProgress from '@material-ui/core/CircularProgress';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles =theme=>({
    root:{
        flexGrow:1,
        background: 'light-grey'
    },
    paper:{
        padding:'1%',
        textAlign:'center'
    },
    mainGrid:{
        
        spacing: 0,
        justify: 'space-around'
    },
    midGrid:{
        padding:'2%',
        justify:'space-evenly'
    },
    accordion:{
        marginTop:'1%'
    },
    backdrop: {
        zIndex:  100,
        color: '#fff',
      }
    
});

class AdminHome extends Component{

    constructor(props) {
        super(props);
        this.state={
            userlist:[],
            page:0,
            rowsPerPage:10,
            isLoading:false,
            isLoggedIn:true,
            preview:false,
            previewData:null,
            content:{}
        }
    }

    async componentDidMount()
    {
        await this.setState({
            isLoading:true
        });
        await this.getAllDetails();

        await this.setState({
            isLoading:false
        });
    }

    getAllDetails=async()=>{
        let res=await getAllUsers();

        if(res.ok)
        {
            let data=await res.json();

           await this.setState({
                userlist:data.users
            });
        }
    }

    logout=()=>{
        this.setState({
            isLoggedIn:false
        });
    }
    handlePages=(event,newPage)=>{
        this.setState({
            page:newPage
        });
    }

    handleRowsperPage=(event)=>{
        this.setState({
            rowsPerPage:event.target.value,
            page:0
        });
    }
    
    handleClick=async(id,key)=>{
        await this.setState({
            isLoading:true
        });
        let response=await sendEmail({_id:id,key:key,content:this.state.content[id]});

        if(response.ok)
        {
            await this.getAllDetails();

            await this.setState({
                isLoading:false,
                ...this.state.content,
                content:{
                    [id]:''
                }
            });
        }

    }

    onEmailContentChange=id=>async event=>{
        await this.setState({
            ...this.state.content,
            content:{
                [id]:event.target.value
            }
        });
        console.log(this.state.content);
    }

    handlePreview=async(data)=>{
        await this.setState({
            preview:true,
            previewData:data
        });
    }

    handleClose=()=>{
        this.setState({
            preview:false
        })
    }

    render()
    {
        const {classes}=this.props;
        const {page,rowsPerPage}=this.state;

        if(!this.state.isLoggedIn)
            return(
                <Redirect to="/admin"/>
            )

        return(
           <div className={classes.root}>
               <Grid direction="column" className={classes.mainGrid} container>
                   <Grid item>
                   <Header logout={this.logout} />
                   </Grid>
                   <Grid direction="column" item container className={classes.midGrid}>
                       <TableContainer>
                           <Table stickyHeader>
                               <TableHead>
                                   <TableCell align="center">Name</TableCell>
                                   <TableCell align="center">Email</TableCell>
                                   <TableCell align="center">Phone No.</TableCell>
                                   <TableCell align="center">Cough</TableCell>
                                   <TableCell align="center">Chest Pain</TableCell>
                                   <TableCell align="center">Fever</TableCell>
                                   <TableCell align="center">Smoke</TableCell>
                                   <TableCell align="center">Sneezing</TableCell>
                                   <TableCell align="center">Dry Mouth</TableCell>
                                   <TableCell align="center">RTPCR Report</TableCell>
                                   <TableCell align="center">Chest Report</TableCell>
                                   <TableCell align="center">Authorized</TableCell>
                                   <TableCell align="center">Verify</TableCell>
                               </TableHead>
                               {
                                   this.state.userlist.length>0 &&
                                   <TableBody>
                                      { 
                                      this.state.userlist.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage).map((item,index)=>{
                                        return (
                                            <TableRow key={item._id}>
                                                <TableCell align="center">
                                                    {item.name}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.emailId}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.phone}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.cough? "True":"False"}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.chest_pain? "True":"False"}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.fever? "True":"False"}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.smoke? "True":"False"}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.sneezing? "True":"False"}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.dry_mouth? "True":"False"}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button color="secondary" disabled={item.rtpcr === null ? true : false} variant="contained" onClick={()=>this.handlePreview(item.rtpcr)}>View</Button>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button color="secondary" disabled={item.chest_report === null ? true : false} variant="contained" onClick={()=>this.handlePreview(item.chest_report)}>View</Button>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.isVerified ? "True":"False"}
                                                </TableCell>
                                                <TableCell align="center">
                                                <TextareaAutosize onChange={this.onEmailContentChange(item._id)} aria-label="empty textarea" placeholder="Email Content" value={this.state.content[item._id]} />
                                                <Grid justify="space-around" direction="column">
                                                <Button color="primary" variant="contained" style={{width:'50%'}} onClick={()=>this.handleClick(item._id,true)}>Send key</Button>
                                                <Button color="secondary" variant="contained" style={{width:'50%'}} onClick={()=>this.handleClick(item._id,false)}>Send Email</Button>
                                                </Grid>
                                                    
                                                </TableCell>
                                            </TableRow>
                                        )
                                       })
                                       }
                                   </TableBody>
                               }
                               {
                                   this.state.userlist.length===0 && 
                                   <TableBody>
                                       <TableRow>
                                           <Typography variant="h6">
                                               No Data available
                                           </Typography>
                                       </TableRow>
                                   </TableBody>
                               }
                           </Table>
                       </TableContainer>
                       <TablePagination
                       rowsPerPageOptions={[10, 25, 100]}
                       component="div"
                       count={this.state.userlist.length}
                       rowsPerPage={rowsPerPage}
                       page={page}
                       onChangePage={this.handlePages}
                       onChangeRowsPerPage={this.handleRowsperPage}
                       />
                   </Grid>
               </Grid>
               <Backdrop className={classes.backdrop} open={this.state.isLoading}>
                        <CircularProgress/>
                    </Backdrop>
                <Backdrop className={classes.backdrop} open={this.state.preview} style={{overflow:'auto'}} onClick={this.handleClose}>
                    
                        <div>
                        <img src={this.state.previewData} />
                        </div>
                    
                    
                </Backdrop>
           </div>
        )
    }
}

export default  withStyles(useStyles)(AdminHome);