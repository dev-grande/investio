export function data(state = {}, action) {
  switch (action.type) {
    case "GET_DASHBOARD_REQUEST":
      return {
      ...state,
      items: { ...state.items,
        loading: true
      } 
      };
    case "GET_DASHBOARD_SUCCESS":
      return {
      ...state,
      items: { ...state.items,
          div_total: action.data.div_total,
          aggregated: action.data.aggregated,
          cash_value: action.data.cash_value,
          invested: action.data.invested,
          current_stocks: action.data.current_stocks,
          div_stocks: action.data.div_stocks,
          loading: false
      } 
      };

    case "GET_REPORTS_REQUEST":
      return {
      ...state,
      items: { ...state.items,
        loading: true
      } 
      };
    case "GET_REPORTS_SUCCESS":
      return {
      ...state,
        items: { ...state.items,
        raw_div: action.data.raw_div,
        aggregated_div: action.data.aggregated_div,
        buy_sell: action.data.buy_sell,
          loading: false
      } 
      };

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

    // case "UPLOAD_SUCCESS":
    //     console.log(action.data);
    //   return {
    //       items: action.data
    //   };
    default:
      return state
  }
}