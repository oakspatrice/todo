export default (state, action) => {
  
  if(action.type==="Load_all_todo_list_json_to_store"){
    let new_state = Object.assign({}, state, ) 
    new_state.pages.homepage.list_of_all_todos=action.payload
    
    return new_state
  }

  if(action.type==="load_list_of_all_todos_from_api_action"){
    let new_state = Object.assign({}, state, ) 
    new_state.pages.homepage.load_list_of_all_todos_from_api=action.payload
    
    return new_state
  }

  if(action.type==="save_current_todo_data_to_store_action"){
    let new_state = Object.assign({}, state, ) 
    new_state.pages.individual_todo_page.current_todo_data = action.payload;
    
    return new_state
  }

  if(action.type==="show_individual_todo_page_action"){
    let new_state = Object.assign({}, state ) 
    new_state.pages.homepage.show_homepage= action.payload.homepage;
    new_state.pages.individual_todo_page.show_individual_todo_page = action.payload.Individual_todo_page;
    new_state.pages.individual_todo_page.current_todo_id= action.payload.current_todo_id;
    new_state.pages.finished_todo.show_finished_todo_page = action.payload.achived_todo_page;
    return new_state
  }

  if(action.type==="set_current_individual_todo_sub_page_to_store_action"){
    let new_state = Object.assign({}, state ) ;
    new_state.pages.individual_todo_page.current_individual_todo_sub_page = action.payload;
    return new_state
  }

  if(action.type==="show_homepage_action"){
    let new_state = Object.assign({}, state ) 
    new_state.pages.homepage.show_homepage= action.payload.homepage;
    new_state.pages.individual_todo_page.show_individual_todo_page = action.payload.Individual_todo_page;
    new_state.pages.finished_todo.show_finished_todo_page = action.payload.achived_todo_page;
    return new_state
  }
 
  if(action.type==="show_achived_todo_page_action"){
    let new_state = Object.assign({}, state ) 
    new_state.pages.homepage.show_homepage= action.payload.homepage;
    new_state.pages.individual_todo_page.show_individual_todo_page = action.payload.Individual_todo_page;
    new_state.pages.finished_todo.show_finished_todo_page = action.payload.achived_todo_page;
    return new_state
  }

  if(action.type==="show_login_block_action"){
    let new_state = Object.assign({}, state ) 
    new_state.user_section.show_user_login_block= action.payload;
    
    return new_state
  }
  
  if(action.type==="save_user_info_to_store_from_api_action"){
    let new_state = Object.assign({}, state ) 
    new_state.user_section.logged_in_user_details= action.payload;
    
    return new_state
  }

  if(action.type==="show_add_new_todo_block_action"){
    let new_state = Object.assign({}, state ) 
    new_state.show_add_new_todo_section= action.payload;
    
    return new_state
  }


  else{ return state}
  
};