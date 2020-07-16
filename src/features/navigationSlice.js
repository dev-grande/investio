import { createSlice } from '@reduxjs/toolkit'

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
      // dashboard, reports, settings
    pages: ["active item", "item", "item"]
  },
  reducers: {
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

export const { switchPage } = navigationSlice.actions;

export const getPages = state => state.navigation.pages;

export default navigationSlice.reducer