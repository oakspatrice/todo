import { createStore } from 'redux'
import rotateReducer from './Reducers';
import { composeWithDevTools } from 'redux-devtools-extension';


let state= {  
              header_section: true,

              show_add_new_todo_section:false,

              user_section: {
                show_user_login_block: true,
                logged_in_user_details: {
                    username: "Anonymous User",



                    },


               },

              
         
              
              pages:{

                finished_todo:{
                  show_finished_todo_page:false,

                },
                //data for homepage
                homepage:{
                  show_homepage:true,
                  load_list_of_all_todos_from_api : true,
                  list_of_all_todos:[],
                  

                },

                //data for individual_todo_page
                individual_todo_page:{
                  show_individual_todo_page:false,
                  current_todo_id: null,
                  current_todo_data:{},
                  current_individual_todo_sub_page:"todo_details_page"
                  
                },
                

                


              },
              

            };



function configureStore() {
  return createStore(rotateReducer,
                       state, 
                       composeWithDevTools() );
}

export default configureStore;