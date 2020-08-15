export function data(state = {}, action) {
  switch (action.type) {
    case "GETALL_REQUEST":
      return {
        loading: true
      };
    case "GETALL_SUCCESS":
      return {
        items: action.data
      };
    // case "UPLOAD_SUCCESS":
    //     console.log(action.data);
    //   return {
    //       items: action.data
    //   };
    case "GET_STOCK_DIV_REQUEST":
      return {
      ...state,
      items: { ...state.items,
        loading: true
      } 
      };
    case "GET_STOCK_DIV_SUCCESS":
      return {
      ...state,
      items: { ...state.items,
          individual_div: action.data.individual_div,
          selected_stock: action.data.selected_stock,
          loading: false
      } 
      };
    case "DELETION_SUCCESS":
      console.log(action.data);
      return {
        items: action.data
      };
    default:
      return state
  }
}