export function data(state = {}, action) {
  switch (action.type) {
    case "GETALL_SUCCESS":
      return {
        items: action.data
      };
      case "UPLOAD_SUCCESS":
          console.log(action.data);
        return {
            items: action.data
        };
    case "SELECT_YEAR":
        return {
        ...state,
        items: { ...state.items,
            selected_year: action.selected_year
        } 
      
        
        };
    default:
      return state
  }
}