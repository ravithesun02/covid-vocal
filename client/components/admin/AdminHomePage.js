import { Backdrop, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, withStyles } from '@material-ui/core';
import React , {Component} from 'react';
import { Redirect } from 'react-router';
import {getAllUsers,sendEmail} from '../../api/api-admin';
import Header from '../HeaderComponent';
import CircularProgress from '@material-ui/core/CircularProgress';

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
            isLoggedIn:true
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
    
    handleClick=async(id)=>{
        await this.setState({
            isLoading:true
        });
        let response=await sendEmail({_id:id});

        if(response.ok)
        {
            await this.getAllDetails();

            await this.setState({
                isLoading:false
            });
        }

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
                                                    {item.isVerified ? "True":"False"}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button color="secondary" variant="contained" onClick={()=>this.handleClick(item._id)}>Send Email</Button>
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
           </div>
        )
    }
}

export default  withStyles(useStyles)(AdminHome);