import { createSlice } from '@reduxjs/toolkit'
import { history } from '../helpers/history';

          // dashboard, reports, settings
var def = ["active item", "item", "item"];
if (history.location.pathname === '/Settings') def = ["item", "item", "active item"];
if (history.location.pathname === '/Reports') def = ["item", "active item", "item" ];

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    pages: def,
    dashboard_nav: "monthly"
  },
  reducers: {

    switchDashboardNav: (state, action) => {
    var new_nav = action.payload;  
    state.dashboard_nav = new_nav;
    }, 
    switchPage: (state, action) => {
        var active_page = action.payload;  

        state.pages[0] = "item";
        state.pages[1] = "item";
        state.pages[2] = "item";

        if (active_page === "dashboard"){
            state.pages[0] = "active item";
        }
        else if (active_page === "reports"){
            state.pages[1] = "active item";
        }
        else if (active_page === "settings"){
            state.pages[2] = "active item";
        }
    }  
  } 

});

export const { switchPage, switchDashboardNav } = navigationSlice.actions;

export const getPages = state => state.navigation.pages;
export const getDashboardNav = state => state.navigation.dashboard_nav;

export default navigationSlice.reducer