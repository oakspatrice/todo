// App.js
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Redirect, withRouter, Link, BrowserRouter as Router } from 'react-router-dom'
import { show_individual_todo_page_action } from './Actions';
import { show_homepage_action } from './Actions';
import {Load_all_todo_list_json_to_store} from './Actions';
import {load_list_of_all_todos_from_api_action} from './Actions';
import {save_current_todo_data_to_store_action} from './Actions';
import {set_current_individual_todo_sub_page_to_store_action} from './Actions';
import {show_login_block_action} from './Actions';
import {save_user_info_to_store_from_api_action} from './Actions';
import {show_add_new_todo_block_action} from './Actions';
import {show_achived_todo_page_action} from './Actions';
import axios from 'axios';


class App extends Component {
  componentDidMount() {

    const token = localStorage.getItem("token")
    console.log(token);
    if (token){
     
      this.props.show_login_block_action(false);

     }
    
     setInterval(this.get_user_info, 5000)

  }  

  get_user_info=()=>{

    

      const token = localStorage.getItem("token");
      

      if(token){
        const token_header= { Authorization :  'Token '+token}     
 
          axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/userinfo/',
            headers: token_header
          })
          
          .then(res => {
           
              this.props.save_user_info_to_store_from_api_action(res.data)
          })

          .catch(function (error) {
                // handle error
                console.log(error);
                alert(error);
          })

      }
      else{
        const anonymous_user= {
          username: "Anonymous User",
          }

      this.props.save_user_info_to_store_from_api_action(anonymous_user);

      }
      

    
  }
  

  render() {

    
    
    
   

    let section_1= null;
    let section_2 = null;
    let section_3 = null;
    let user_login_section= null;
    let add_new_todo_section=null;
    let finished_todo_page=null;


   
    

    if (this.props.show_user_login_block === true ){
      user_login_section = <ConnectUser_login_section></ConnectUser_login_section>;
      
    }

    if ( this.props.header_section === true){
      section_1 =<ConnectHeader_section></ConnectHeader_section>;
    }

   

    if (this.props.show_add_new_todo_block === true ){
      add_new_todo_section= <ConnectAdd_new_todo_section></ConnectAdd_new_todo_section>
    }



    return (
      
    
      <div>

        <div>
        {user_login_section}
       
        {section_1}
        </div>
        <Route exact path="/" component={ConnectHomepage} />
        <Route exact path="/achived_todos" component={ConnectFinished_todo_page} />
        <Route exact path="/add_new_todo" component={ConnectAdd_new_todo_section} />
        <Route path="/todo_detail_page/:id" component={ConnectIndividual_todo_page} />
      </div>
    );
  }






}



class User_login_section extends Component {

  constructor(props) {
    super(props);
    this.state = {
                  login_details:   {
                                  username:"",
                                  password:  "",                      
                  },                                                           

      };

   
  }

  handleChange=(event)=> {
   

    let new_form_data= this.state.login_details;
    let key;
    for (key in new_form_data){
      if(key===event.target.id){
        new_form_data[key]=event.target.value;
        this.setState({form_data: new_form_data});
       
      } 
    }

  }

  handleSubmit=(event)=> {
    event.preventDefault();


    let string1 ="http://127.0.0.1:8000/api/";
            let string2="api-token-auth";
            let url = string1.concat(string2,"/");



      axios({
        method: 'post',
        url: url,
        data:this.state.login_details

      })
    
        .then(res => {
          const response = res.data;
          this.setState({form_data: response})
          localStorage.setItem("token", response.token);
          
        
          this.props.show_login_block_action(false);
          this.props.load_list_of_all_todos_from_api_action(true)

        })

      .catch(function (error) {
          // handle error
          console.log(error);
          alert(error);
      })





  }


  
  

  render() {

    const fullstyle = {
      width: "100%",
      height:"100%",
      zIndex:5,
      position: "fixed",
      background:"rgba(0, 0, 0, 0.6)",
      bottom: 0,
      right: 0,
      top:0,
      left:0,
    };

    const mystyle = {
      width: "300px",
      textAlign: "center",
      margin: "auto",
      marginTop:"200px",
      position: "relative",
      zIndex:9,
      background:"white",
  
    }
    
    const formstyle={
      padding:"50px 50px 50px 50px"
    };


    return (
      <div style={fullstyle}>
        
      <div style={mystyle}>
      <button style={{float:"right"}} >Close</button>
      <form  style={formstyle} onSubmit={this.handleSubmit}>
        <div class="form-group">
        <label>Username</label>
          <input type="text" id="username" class="form-control"  onChange={this.handleChange} />
        </div>
      
        <div class="form-group">
        <label>Password</label>
          <input type="password" id="password" class="form-control"  onChange={this.handleChange} />
        </div>

      <input type="submit" value="Submit" class="btn btn-primary"/>

    </form>
</div>
</div>    
    
    );
  }

}




class Add_new_todo_section extends Component {

  constructor(props) {
    super(props);
    this.state = {
                  form_data:   {
                                  title:null,
                                  description: null,
                                  todo_due_date: null,
                                  email:"no",                                 
                                  sms: "no",

                  },                                                           

      };
      
    
  }

  handleChange=(event)=> {
   

    let new_form_data= this.state.form_data;
    let key;
    for (key in new_form_data){
      if(key===event.target.id){
        new_form_data[key]=event.target.value;
        this.setState({form_data: new_form_data});
       
      } 
    }

  }

  handleSubmit=(event)=> {
    event.preventDefault();
    
    let todo_due_date = Date.parse(this.state.form_data.todo_due_date);
    let current_date = Date.now(); 
    
    alert(todo_due_date +" "+ current_date)
    alert(this.state.form_data.todo_due_date)
      if(current_date < todo_due_date ){
          let url ="http://127.0.0.1:8000/api/";

          const token = localStorage.getItem("token");
          let token_header= {};

          if(token){
              token_header= { Authorization :  'Token '+token}     
          }

          axios({
            method: 'post',
            url: url,
            data:this.state.form_data,
            headers: token_header
          })
          
            .then(res => {
              this.props.load_list_of_all_todos_from_api_action(true);
              alert('Todo Saved Succesfully')
            })

            .catch(function (error) {
                // handle error
                console.log(error);
                alert(error);
            })
      }        
      else{
        alert("ERROR : Todo Due Date Cannot Be Before Today")
      }
  }

  render() {
    
    const fullstyle = {
      width: "100%",
      height:"100%",
      zIndex:3,
      position: "fixed",
      background:"rgba(0, 0, 0, 0.6)",
      bottom: 0,
      right: 0,
      top:0,
      left:0,
    };

    const mystyle = {
      width: "70%",
      textAlign: "center",
      margin: "auto",
      marginTop:"5%",
      position: "relative",
      zIndex:9,
      background:"white",
      maxWidth: "900px",
      minWidth:"300px",
      maxHeight:"80%",
      
      overflowX: "auto",
    }
    
    const formstyle={
      padding:"5%"
    };




    return (
    <div style={fullstyle} >
      
      <div style={mystyle} >
      <a class="btn btn-primary" href="#"  style={{animation:"rotate 1s 1", margin:"2px", float:"right"}}>Go Back</a> 
      <form onSubmit={this.handleSubmit} style={formstyle}>
      <h3> Add A New Todo By Completing This Form</h3>
        <div class="form-group" style={{animation:"throwup 1s 1"}}>
        <label><b>Todo Title </b></label>
          <input type="text" id="title" class="form-control" value={this.state.form_data.title} onChange={this.handleChange} />
        </div>

        <div class="form-group" style={{animation:"throwup 2s 1"}}>
        <label><b>Todo Description</b></label>
        <textarea class="form-control" id="description" rows="3" onChange={this.handleChange}>
          {this.state.form_data.description}
        </textarea>
        </div>

        <div class="form-group"style={{animation:"throwup 3s 1"}}>
        <label><b>Todo Due Date</b></label>
          <input type="date" id="todo_due_date" class="form-control" value={this.state.form_data.todo_due_date} onChange={this.handleChange} />
        </div>

        <div class="form-group" style={{animation:"throwup 4s 1"}}>
        <label><b>Reminder Email</b></label>
        <select class="custom-select" id="email" 
        onChange={this.handleChange} value={this.state.form_data.email_reminder_frequency}>
          <option value="no">I do not want Reminder Email</option>
          <option value="monthly">Send Monthly</option>
          <option value="weekly">Send Weekly</option>
          <option value="daily">Send Daily</option>
          <option value="hourly">Send Hourly</option>
        </select>
        </div>

        <div class="form-group" style={{animation:"throwup 5s 1"}}>
        <label><b>Reminder SMS</b></label>
        <select class="custom-select" id="sms"
                  value={this.state.form_data.sms_reminder_frequency} onChange={this.handleChange}>

          <option value="no">I do not want Reminder SMS</option>
          <option value="monthly">Send Monthly</option>
          <option value="weekly">Send Weekly</option>
          <option value="daily">Send Daily</option>
          <option value="hourly">Send Hourly</option>
        </select>
        </div>

        <input type="submit" value="Save Todo" class="btn btn-primary"/>
       
        <a class="btn btn-primary" href="#" onClick={()=>this.props.show_add_new_todo_block_action(false)} style={{animation:"rotate 1s 1", margin:"2px"}}>Go Back</a>
        
              
      </form>
      </div>
  </div>  

    )


  }  




}






class Header_section extends Component {

  logout=()=>{
    localStorage.removeItem("token");
    this.props.show_login_block_action(true)
    this.props.load_list_of_all_todos_from_api_action(true);
  }

  

  render() {

    let logout_button=null;
    if(this.props.show_user_login_block===false){
      logout_button=  <li class="nav-item active">
      <a class="nav-link" href="#" onClick={this.logout} style={{animation:"jingle 10s infinite"}}>Logout</a>
      </li>
    }

    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" >
      <div class="container" style={{animation:"rotate 7s 1"}}>
        <a class="navbar-brand" href="#" onClick={this.props.show_homepage_action} style={{animation:"jingle 7s infinite"}}>Todos.com</a>

        <a class="navbar-brand" href="#" style={{margin:"auto", animation:"jingle 7s infinite"}} >{this.props.load_user_info_from_store.username}</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="#" onClick={this.props.show_homepage_action} style={{animation:"jingle 10s infinite"}}><Link to="/">Home</Link>
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#" onClick={()=>this.props.show_add_new_todo_block_action(true)} style={{animation:"jingle 10s infinite"}}><Link to="/add_new_todo">Add New Todo</Link></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="#" onClick={this.props.show_achived_todo_page_action} style={{animation:"jingle 10s infinite"}}><Link to="/achived_todos">Archived Todos</Link></a>
            </li>
           
            {logout_button}

          </ul>
        </div>

      </div>
    </nav>
    );
  }

}








class Homepage extends Component {
  state = {
    todos: [],
    redirect_to_individual_todo_page:false,
    todo_detail_id:null
  };

  componentDidMount() {
    // load is a fuction that gets todo list from api and load todo list to store, it also stops
    // it also stops future data to be load from api, so that the store version should be used

    

      let load = () => {

        if(this.props.load_list_of_all_todos_from_api_status===true){

          const token = localStorage.getItem("token");
          let token_header= {};

          if(token){
            token_header= { Authorization :  'Token '+token}     
          }
          
          
          axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/',
            headers: token_header
          })
          
            .then(res => {
              const todos = res.data;
              this.props.Load_all_todo_list_json_to_store(todos);
              this.props.load_list_of_all_todos_from_api_action(false);
            })

            .catch(function (error) {
                // handle error
                console.log(error);
                alert(error);
            })
        }  
    }   
          
  // this if statements check if the todo list in store is empty or outdated and calls
  //the function that load todo list from api
 
    
    setInterval(load, 1000)    

  }



  set_random_animation_time=()=>{
    let x= Math.floor(Math.random()*5);
    x ="throw "+ x +"s" + " 1";
    console.log(x);
    return(x);

  }

  redirect_to_individual_todo_page=(page_id)=>{
    
    this.setState({redirect_to_individual_todo_page: true});
    this.setState({todo_detail_id: page_id });
  }

  

  render() {

    if (this.state.redirect_to_individual_todo_page === true) {
      let url = 'todo_detail_page/';
      let url2 = this.state.todo_detail_id;
      url = url + url2;
     
      return <Redirect to ={url} />
    }  

    
    let unfinished_todo = [];
    let x;
    
    if(this.props.list_of_all_todos.length>0){
      
    for (x of this.props.list_of_all_todos) {  
      if(x.todo_status!=="Completed"){
        unfinished_todo.push(x);
      }
    }

    unfinished_todo.sort(function(a, b){
      var dateA=new Date(a.todo_due_date), dateB=new Date(b.todo_due_date)
      return dateA-dateB //sort by date ascending
  })




  }
  console.log(this.props.list_of_all_todos);
  console.log(unfinished_todo)

    return (
      <div >
        <p></p>
        <h3>List of All Your Todos</h3>
        <p>View all your undone Todo Activities here</p>
        <table class="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">TITLE</th>
              <th scope="col">DESCRIPTION</th>
              <th scope="col">Deadline Date</th>
            </tr>
          </thead>

          <tbody>
            
          
          {unfinished_todo.map(item => (               
          <tr onClick={() =>this.redirect_to_individual_todo_page(item.id)} style={{animation:this.set_random_animation_time()}}>
          <td scope="row" key={item.id}   >{unfinished_todo.indexOf(item) + 1} </td>
          <td>{item.title}</td>
          <td >{item.description}</td> 
          <td >{item.todo_due_date}</td>
        
        
          </tr>

          ))}
           
            
            

          </tbody>
        </table>
      </div>  
    );
  }
}



class Finished_todo_page extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    // load is a fuction that gets todo list from api and load todo list to store, it also stops
    // it also stops future data to be load from api, so that the store version should be used

    

      let load = () => {

        if(this.props.load_list_of_all_todos_from_api_status===true){

          const token = localStorage.getItem("token");
          let token_header= {};
          

          if(token){
            token_header= { Authorization :  'Token '+token}     
          }
          

          axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/',
            headers: token_header
          })
          
            .then(res => {
              const todos = res.data;
              this.props.Load_all_todo_list_json_to_store(todos);
              this.props.load_list_of_all_todos_from_api_action(false);
            })

            .catch(function (error) {
                // handle error
                console.log(error);
                alert(error);
            })
        }  
    }   
          
  // this if statements check if the todo list in store is empty or outdated and calls
  //the function that load todo list from api
 
    
    setInterval(load, 1000)    

  }

  delete_todo=(data)=>{

    const token = localStorage.getItem("token");
          let token_header= {};
          let url1 = 'http://127.0.0.1:8000/api/';
          let url2 = data;
          let api_url = url1.concat(url2,"/");

          if(token){
            token_header= { Authorization :  'Token '+token}     
          }
          

          axios({
            method: 'delete',
            url: api_url,
            headers: token_header
          })
          
            .then(res => {
              this.props.load_list_of_all_todos_from_api_action(true);
            })

            .catch(function (error) {
                // handle error
                console.log(error);
                alert(error);
            })



  }

  redirect_to_individual_todo_page=(page_id)=>{
    
    this.props.history.push('/todo_detail_page/'+ page_id)
  }



  set_random_animation_time=()=>{
    let x= Math.floor(Math.random()*5);
    x ="throw "+ x +"s" + " 1";
    console.log(x);
    return(x);

  }

  

  render() {
    
    let finished_todo = [];
    let x;
    
    if(this.props.list_of_all_todos.length>0){
      
    for (x of this.props.list_of_all_todos) {  
      if(x.todo_status==="Completed"){
        finished_todo.push(x);
      }
    }
  }
  console.log(this.props.list_of_all_todos);
  console.log(finished_todo)

    return (
      <div >
        <p></p>
        <h3>List of All Archived Todos</h3>
        <p>View all your Archived Todo Activities here</p>
        <table class="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">TITLE</th>
              <th scope="col">DESCRIPTION</th>
              <th scope="col">TODO ARCHIVED DATE</th>
            </tr>
          </thead>

          <tbody>
            
          
          {finished_todo.map(item => (               
          <tr  onClick={() =>this.redirect_to_individual_todo_page(item.id)} style={{animation:this.set_random_animation_time()}}>
          <td scope="row" key={item.id}   >{finished_todo.indexOf(item) + 1} </td>
          <td>{item.title}</td>
          <td >{item.description}</td> 
          <td >{item.todo_finished_date}</td> 
          <td ><a class="btn btn-primary" href="#" onClick={()=>this.delete_todo(item.id)} style={{animation:"rotate 1s 1", margin:"2px"}}>Delete Permanently</a></td> 
          </tr>

          ))}
           
            
            

          </tbody>
        </table>
      </div>  
    );
  }
}







class Individual_todo_page extends Component {
   
  componentDidMount() {
    // load is a fuction that gets todo list from api and load todo list to store, it also stops
    // it also stops future data to be load from api, so that the store version should be used
    this.props.set_current_individual_todo_sub_page_to_store_action("todo_details_page") 

    const token = localStorage.getItem("token");
    let token_header= {};
    let string1 ="http://127.0.0.1:8000/api/";
    let string2=this.props.match.params.id;
    let request_url = string1.concat(string2);

          if(token){
            token_header= { Authorization :  'Token '+token}     
          }
          
          axios({
            method: 'get',
            url: request_url,
            headers: token_header
          })
          
            .then(res => {
              const todo = res.data;
              this.props.save_current_todo_data_to_store_action(todo)
              this.props.show_individual_todo_page_action(this.props.match.params.id)

            })

            .catch(function (error) {
                // handle error
                console.log(error);
                alert(error);
            })
    
  }

  render() {
    let edit_button = null;
    if(this.props.current_todo_data.todo_status!="Completed"){
      edit_button = <li class="nav-item">
      <a class="nav-link" href="#" onClick={()=>show_page("todo_edit_page")} style={{animation:"rotate 1s 1"}}>Edit Todo</a>
    </li>

      
    }
    

    let section_1=null ;

    if (this.props.current_todo_sub_page ==="todo_details_page"){
      section_1 = <ConnectIndividual_todo_details_page> </ConnectIndividual_todo_details_page>;
    }
    if (this.props.current_todo_sub_page==="todo_edit_page"){
      section_1=  <ConnectIndividual_todo_edit_page> </ConnectIndividual_todo_edit_page>;
    }
    

    let show_page=(data)=>{
      
      this.props.set_current_individual_todo_sub_page_to_store_action(data);
      
    }
    
    return (
      <div >


        <p><button type="button" class="btn btn-dark" style={{marginTop:"60px"}}><Link to="/">Go Back to Todo List</Link></button></p>

        
        
        

        <div class="card text-center" >
          <div class="card-header">
            <ul class="nav nav-pills card-header-pills">
              <li class="nav-item">
                <a class="nav-link active" href="#" onClick={()=>show_page("todo_details_page")} style={{animation:"rotate 3s 1"}}>Todo Details</a>
              </li>
              {edit_button}
              
            </ul>
          </div>

          
          
        </div>

        
      


        
        <div>

        {section_1}
       
       
        </div>

      </div>
    );
  }


}



class Individual_todo_details_page extends Component {

  componentDidMount() {

  }  


  finish_todo= ()=>{

    let string1 ="http://127.0.0.1:8000/api/";
    let string2=this.props.current_todo_id;
    
    let url = string1.concat(string2,"/");
    const token = localStorage.getItem("token");
    let token_header= {};

    if(token){
        token_header= { Authorization :  'Token '+token}     
    }


    let request_data = this.props.current_todo_data;
    
    request_data.todo_status= "Completed";

    axios({
      method: 'put',
      url: url,
      data:request_data,
      headers: token_header
    })
    
      .then(res => {
        const response_data = res.data;
        this.props.load_list_of_all_todos_from_api_action(true);
        alert("Todo Finished Sucessfully")
        window.location.reload(true)
      })

      .catch(function (error) {
          // handle error
          console.log(error);
          alert(error);
      })

  }


  delete_todo=(data)=>{

    const token = localStorage.getItem("token");
          let token_header= {};
          let url1 = 'http://127.0.0.1:8000/api/';
          let url2 = data;
          let api_url = url1.concat(url2,"/");

          if(token){
            token_header= { Authorization :  'Token '+token}     
          }
          

          axios({
            method: 'delete',
            url: api_url,
            headers: token_header
          })
          
            .then(res => {
              alert("Todo deleted succesfully")
              this.props.load_list_of_all_todos_from_api_action(true);
              this.props.history.go(-2)
            })

            .catch(function (error) {
                // handle error
                console.log(error);
                alert(error);
            })



  }

  render() {
    let edit_button = null;
    let mark_todo_completed=null;
    let delete_todo_permanently = null;
    
    if(this.props.current_todo_data.todo_status!="Completed"){
      edit_button =  <button type="button" class="btn btn-primary" style={{ }} onClick={()=>this.props.set_current_individual_todo_sub_page_to_store_action("todo_edit_page")} style={{animation:"rotate 5s 1", margin:10 }}> Edit Todo</button>  
    }

    if(this.props.current_todo_data.todo_status!="Completed"){
      mark_todo_completed =  <button type="button" class="btn btn-primary"  style={{margin:10 }} onClick={this.finish_todo} style={{animation:"rotate 7s 1"}}>Mark Todo as Completed</button>  
    }
    if(this.props.current_todo_data.todo_status=="Completed"){
      delete_todo_permanently =  <a class="btn btn-primary" href="#" onClick={()=>this.delete_todo(this.props.current_todo_data.id)} style={{animation:"rotate 1s 1", margin:"2px"}}>Delete Permanently</a>
    }

    return (
      <div class="card text-center">
        <div class="card-body">
              <h5 class="card-title">Title: {this.props.current_todo_data.title} </h5>
              <p class="card-text">Description: {this.props.current_todo_data.description}</p>
              <p class="card-text">Due Date: {this.props.current_todo_data.todo_due_date}</p>
              <p class="card-text">Send Email Reminder: {this.props.current_todo_data.email}</p>
              <p class="card-text">Send SMS Reminder: {this.props.current_todo_data.sms}</p>
              <p class="card-text">Status: {this.props.current_todo_data.todo_status}</p>

             
              {edit_button}
              {mark_todo_completed}
              {delete_todo_permanently}
        </div>
      </div>
    );
  }
 

}





class Individual_todo_edit_page extends Component {
  constructor(props) {
    super(props);
    this.state = {
                  form_data:   {
                                  title:this.props.current_todo_data.title,
                                  description: this.props.current_todo_data.description,
                                  todo_due_date: this.props.current_todo_data.todo_due_date,
                                  email:this.props.current_todo_data.email,                                 
                                  sms: this.props.current_todo_data.sms,
                                  

                  },                                                           

      };
      
    
  }

  handleChange=(event)=> {
   

    let new_form_data= this.state.form_data;
    let key;
    for (key in new_form_data){
      if(key===event.target.id){
        new_form_data[key]=event.target.value;
        this.setState({form_data: new_form_data});
       
      } 
    }

  }

  handleSubmit=(event)=> {
    event.preventDefault();


    let string1 ="http://127.0.0.1:8000/api/";
    let string2=this.props.current_todo_id;
    let url = string1.concat(string2,"/");
    const token = localStorage.getItem("token");
    let token_header= {};

    if(token){
        token_header= { Authorization :  'Token '+token}     
    }

    axios({
      method: 'put',
      url: url,
      data:this.state.form_data,
      headers: token_header
    })
    
      .then(res => {
        const todos = res.data;
        this.props.load_list_of_all_todos_from_api_action(true);
        alert('Saved succesfully')
        
        window.location.reload(true)
      })

      .catch(function (error) {
          // handle error
          console.log(error);
          alert(error);
      })

  }

  render() {
    
    return (

      
    <div style={{width:"50%", margin:"auto", marginTop:"20px", marginBottom:"20px"}}>
        <form onSubmit={this.handleSubmit} >
          <div class="form-group" style={{animation:"throwup 1s 1"}}>
          <label><b>Todo Title </b></label>
            <input type="text" id="title" class="form-control" value={this.state.form_data.title} onChange={this.handleChange} />
          </div>

          <div class="form-group" style={{animation:"throwup 2s 1"}}>
          <label><b>Todo Description</b></label>
          <textarea class="form-control" id="description" rows="3" onChange={this.handleChange}>
            {this.state.form_data.description}
          </textarea>
          </div>

          <div class="form-group"style={{animation:"throwup 3s 1"}}>
          <label><b>Todo Due Date</b></label>
            <input type="date" id="todo_due_date" class="form-control" value={this.state.form_data.todo_due_date} onChange={this.handleChange} />
          </div>

          <div class="form-group" style={{animation:"throwup 4s 1"}}>
          <label><b>Reminder Email</b></label>
          <select class="custom-select" id="email" 
          onChange={this.handleChange} value={this.state.form_data.email_reminder_frequency}>
            <option value="no">I do not want Reminder Email</option>
            <option value="monthly">Send Monthly</option>
            <option value="weekly">Send Weekly</option>
            <option value="daily">Send Daily</option>
            <option value="hourly">Send Hourly</option>
          </select>
          </div>

          <div class="form-group" style={{animation:"throwup 5s 1"}}>
          <label><b>Reminder SMS</b></label>
          <select class="custom-select" id="sms"
                    value={this.state.form_data.sms_reminder_frequency} onChange={this.handleChange}>

            <option value="no">I do not want Reminder SMS</option>
            <option value="monthly">Send Monthly</option>
            <option value="weekly">Send Weekly</option>
            <option value="daily">Send Daily</option>
            <option value="hourly">Send Hourly</option>
          </select>
          </div>

          <input type="submit" value="Submit" class="btn btn-primary"/>

        </form>

    </div>  
       
    );
  }
 

}


///////////////connecting Finished_todo_page to store
const mapStateToFinished_todo_page_Props = state => ({
  list_of_all_todos: state.pages.homepage.list_of_all_todos,
  load_list_of_all_todos_from_api_status: state.pages.homepage.load_list_of_all_todos_from_api,
  
});
const mapDispatchToFinished_todo_page_Props =  dispatch => ({  
  Load_all_todo_list_json_to_store: (data) => dispatch(Load_all_todo_list_json_to_store(data)),
  load_list_of_all_todos_from_api_action:(data) => dispatch(load_list_of_all_todos_from_api_action(data)),
});

let ConnectFinished_todo_page = connect (mapStateToFinished_todo_page_Props, mapDispatchToFinished_todo_page_Props)(Finished_todo_page);



///////////////connecting Add_new_todo_section to store
const mapStateToAdd_new_todo_section_Props = state => ({
  
});
const mapDispatchToAdd_new_todo_section_Props =  dispatch => ({  
  show_add_new_todo_block_action : (data) => dispatch(show_add_new_todo_block_action(data)), 
  load_list_of_all_todos_from_api_action:(data) => dispatch(load_list_of_all_todos_from_api_action(data)),
});

let ConnectAdd_new_todo_section = connect (mapStateToAdd_new_todo_section_Props, mapDispatchToAdd_new_todo_section_Props)(Add_new_todo_section);


///////////////connecting Userlogin Page to store
const mapStateToUser_login_section_Props = state => ({
  
  
});
const mapDispatchToUser_login_sectionProps =  dispatch => ({  
  show_login_block_action : (data) => dispatch(show_login_block_action(data)),
  load_list_of_all_todos_from_api_action:(data) => dispatch(load_list_of_all_todos_from_api_action(data)),
});

let ConnectUser_login_section = connect (mapStateToUser_login_section_Props, mapDispatchToUser_login_sectionProps)(User_login_section);



///////////////connecting Individual todo edit page to store
const mapStateToIndividual_todo_edit_pageProps = state => ({
  current_todo_id: state.pages.individual_todo_page.current_todo_id,
  current_todo_data:state.pages.individual_todo_page.current_todo_data
});
const mapDispatchToIndividual_todo_edit_pageProps =  dispatch => ({  
  save_current_todo_data_to_store_action: (data) => dispatch(save_current_todo_data_to_store_action(data)),
  show_homepage_action : () => dispatch(show_homepage_action),
  load_list_of_all_todos_from_api_action:(data) => dispatch(load_list_of_all_todos_from_api_action(data)),
});

let ConnectIndividual_todo_edit_page = connect (mapStateToIndividual_todo_edit_pageProps, mapDispatchToIndividual_todo_edit_pageProps)(withRouter(Individual_todo_edit_page));

///////////////connecting Individual todo details page to store
const mapStateToIndividual_todo_details_pageProps = state => ({
  current_todo_id: state.pages.individual_todo_page.current_todo_id,
  current_todo_data:state.pages.individual_todo_page.current_todo_data
});
const mapDispatchToIndividual_todo_details_pageProps =  dispatch => ({  
  save_current_todo_data_to_store_action: (data) => dispatch(save_current_todo_data_to_store_action(data)),
  show_homepage_action : () => dispatch(show_homepage_action),
  load_list_of_all_todos_from_api_action:(data) => dispatch(load_list_of_all_todos_from_api_action(data)),
  
  set_current_individual_todo_sub_page_to_store_action : (data) => dispatch(set_current_individual_todo_sub_page_to_store_action(data)),
});

let ConnectIndividual_todo_details_page = connect (mapStateToIndividual_todo_details_pageProps, mapDispatchToIndividual_todo_details_pageProps)(withRouter(Individual_todo_details_page));

///////////////connecting Individual todo page to store
const mapStateToIndividual_todo_pageProps = state => ({
  current_todo_data:state.pages.individual_todo_page.current_todo_data,
  current_todo_sub_page : state.pages.individual_todo_page.current_individual_todo_sub_page,
});
const mapDispatchToIndividual_todo_pageProps =  dispatch => ({  
  save_current_todo_data_to_store_action: (data) => dispatch(save_current_todo_data_to_store_action(data)),
  show_homepage_action : () => dispatch(show_homepage_action),
  show_individual_todo_page_action: (data) => dispatch(show_individual_todo_page_action(data)),
  set_current_individual_todo_sub_page_to_store_action : (data) => dispatch(set_current_individual_todo_sub_page_to_store_action(data)),
});

let ConnectIndividual_todo_page = connect (mapStateToIndividual_todo_pageProps, mapDispatchToIndividual_todo_pageProps)(Individual_todo_page);

///////////////connecting homepage section section to store
const mapStateToHomepageProps = state => ({
  list_of_all_todos: state.pages.homepage.list_of_all_todos,
  load_list_of_all_todos_from_api_status: state.pages.homepage.load_list_of_all_todos_from_api,
});
const mapDispatchToHomepageProps =  dispatch => ({  
  Load_all_todo_list_json_to_store: (data) => dispatch(Load_all_todo_list_json_to_store(data)),
  load_list_of_all_todos_from_api_action:(data) => dispatch(load_list_of_all_todos_from_api_action(data)),
  

});
let ConnectHomepage = connect (mapStateToHomepageProps, mapDispatchToHomepageProps)(Homepage);

///////////////connecting header section to store

const mapStateToHeaderSectionProps = state => ({
  load_user_info_from_store : state.user_section.logged_in_user_details,
  show_user_login_block: state.user_section.show_user_login_block,

});


const mapDispatchToHeaderSectionProps = dispatch => ({  
  show_individual_todo_page_action: () => dispatch(show_individual_todo_page_action),
  show_homepage_action : () => dispatch(show_homepage_action),
  show_login_block_action : (data) => dispatch(show_login_block_action(data)),
  load_list_of_all_todos_from_api_action:(data) => dispatch(load_list_of_all_todos_from_api_action(data)),
  show_add_new_todo_block_action : (data) => dispatch(show_add_new_todo_block_action(data)),
  show_achived_todo_page_action : () => dispatch(show_achived_todo_page_action),
});
let ConnectHeader_section = connect (mapStateToHeaderSectionProps, mapDispatchToHeaderSectionProps)(Header_section);


///////////////connecting App to store
const mapStateToAppProps = state => ({
  header_section: state.header_section,
  show_homepage: state.pages.homepage.show_homepage,
  Individual_todo_page: state.pages.individual_todo_page.show_individual_todo_page,
  show_user_login_block: state.user_section.show_user_login_block,
  show_add_new_todo_block: state.show_add_new_todo_section,
  show_finished_todo_page: state.pages.finished_todo.show_finished_todo_page,
});

const mapDispatchToAppProps = dispatch => ({  
  show_individual_todo_page_action: () => dispatch(show_individual_todo_page_action),
  show_homepage_action : () => dispatch(show_homepage_action),
  show_login_block_action : (data) => dispatch(show_login_block_action(data)),
  save_user_info_to_store_from_api_action : (data) => dispatch(save_user_info_to_store_from_api_action(data)),
  


});
export default connect(mapStateToAppProps, mapDispatchToAppProps)(App);