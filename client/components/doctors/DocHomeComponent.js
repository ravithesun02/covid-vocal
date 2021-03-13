import React , {Component} from 'react';
import Header from "../HeaderComponent";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import { Table, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography,TableBody, MenuItem } from '@material-ui/core';
import {getUserDetails,updateUser} from '../../api/api-doc';
import Select from '@material-ui/core/Select';
import { Redirect } from 'react-router-dom';



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
    }
    
});


class DocHome extends Component {

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



  async  componentDidMount()
    {
        let res=await getUserDetails();
        if(res.ok)
        {
            let data=await res.json();

           await this.setState({
                userlist:data.userList
            });
        }

        if(typeof window !== 'undefined')
        {
            window.addEventListener('storage',this.checkSignIn);
        }
    }

    componentWillUnmount()
    {
        window.removeEventListener('storage',this.checkSignIn);
    }

    checkSignIn=()=>{
        if(!localStorage.getItem('doc_jwt'))
            this.setState({
                isLoggedIn:false
            })
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

    updateUserDetail=async(data)=>{
        let res=await updateUser(data);
        if(res.ok)
        {
            let data=await res.json();
            console.log(data);
            await this.setState({
                userlist:data.userList
            });
            console.log(this.state.userlist)
        }
        else
         console.log(res);
    }

    handleResultChange=id=>event=>{
       let data={
           "id":id,
           "covid_doc":event.target.value
       };

       console.log(data);

       this.updateUserDetail(data);
      
    }


    render() {
        const {classes}=this.props;
        const {page,rowsPerPage}=this.state;

        if(!this.state.isLoggedIn)
            return(
                <Redirect to="/doc"/>
            )

        return(
            <div className={classes.root}>
                <Grid direction="column" className={classes.mainGrid} container>
                    <Grid item>
                        <Header/>
                    </Grid>
                    <Grid direction="column"  item container className={classes.midGrid}>
                        <TableContainer>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableCell align="center"> Name </TableCell>
                                    <TableCell align="center"> Phone No. </TableCell>
                                    <TableCell align="center"> Predicted Covid Value(%) </TableCell>
                                    <TableCell align="center"> Test Results </TableCell>
                                </TableHead>
                                {
                                    this.state.userlist.length>0 &&
                                    <TableBody>
                                        {
                                            this.state.userlist.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage).map((item,index)=>{
                                                return(
                                                    <TableRow key={item._id}>
                                                        <TableCell align="center">
                                                            {item.name}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {item.phone}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {item.covid_ai}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Select
                                                            value={item.covid_doc ? item.covid_doc: "None"}
                                                            onChange={this.handleResultChange(item._id)}
                                                            >
                                                                <MenuItem value="positive">Positive</MenuItem>
                                                                <MenuItem value="negative">Negative</MenuItem>
                                                            </Select>
                                                        </TableCell>

                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                }
                                 {this.state.userlist.length === 0 && 
                                <TableBody>
                                    <TableRow>
                                    
                                    <Typography variant="h6">
                                    No Data Available
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
            </div>
        )
    }
}

export default withStyles(useStyles)(DocHome);