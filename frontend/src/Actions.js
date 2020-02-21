export const Load_all_todo_list_json_to_store =(data) => ( {
  type: "Load_all_todo_list_json_to_store",
  payload: data
});


export const load_list_of_all_todos_from_api_action =(data) => ( {
  type: "load_list_of_all_todos_from_api_action",
  payload:data
});

export const show_individual_todo_page_action = (data) => ({
  type: "show_individual_todo_page_action",
  payload:{
            homepage: false,
            Individual_todo_page: true,
            current_todo_id: data,
            achived_todo_page:false,
          }
});

export const show_achived_todo_page_action = {
  type: "show_achived_todo_page_action",
  payload:{
            homepage: false,
            Individual_todo_page: false,
            achived_todo_page:true,
          }
};

export const save_current_todo_data_to_store_action =(data) => ( {
  type: "save_current_todo_data_to_store_action",
  payload:data
});


export const show_homepage_action = {
  type: "show_homepage_action",
  payload:{
            homepage: true,
            Individual_todo_page: false,
            achived_todo_page:false,
          }
};

export const set_current_individual_todo_sub_page_to_store_action =(data) => ( {
  type: "set_current_individual_todo_sub_page_to_store_action",
  payload:data
});

export const show_login_block_action =(data) => ( {
  type: "show_login_block_action",
  payload:data
});

export const save_user_info_to_store_from_api_action =(data) => ( {
  type: "save_user_info_to_store_from_api_action",
  payload:data
});

export const show_add_new_todo_block_action =(data) => ( {
  type: "show_add_new_todo_block_action",
  payload:data
});