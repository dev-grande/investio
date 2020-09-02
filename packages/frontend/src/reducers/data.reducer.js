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
      var items = { ...state.items};
      Object.keys(action.data).map(function(key) { items[key] = action.data[key]; return key;})
      items.loading = false;
      return { items };

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
      items: { ...state.items
      } 
      };

    case "GET_STOCK_DIV_SUCCESS":
      return {
      ...state,
      items: { ...state.items,
          individual_div: action.data.individual_div,
          selected_stock: action.data.selected_stock
      } 
      };

    case "GET_YEARS_SUCCESS":
      return {
      ...state,
      items: { ...state.items,
          years: action.data
      } 
      };

    case "GET_PORTFOLIOS_SUCCESS":
      return {
      ...state,
      items: { ...state.items,
          portfolios: action.data
      } 
      };

    case "ADD_PORTFOLIO_SUCCESS":
      console.log(state.items.portfolios)
      console.log({portfolio: action.portfolio});
      return {
      ...state,
      items: { ...state.items,
          portfolios: [...state.items.portfolios, {portfolio: action.portfolio}]
      } 
      };

    case 'DELETE_YEAR_SUCCESS':
      // remove deleted year from state
      return {
        ...state,
        items: { ...state.items,
            years: state.items.years.filter(year => year.year !== action.year)
        } 
      };

    case 'DELETE_PORTFOLIO_SUCCESS':
      // remove deleted year from state
      return {
        ...state,
        items: { ...state.items,
          portfolios: state.items.portfolios.filter(p => p.portfolio !== action.portfolio)
        } 
      };

    default:
      return state
  }
}