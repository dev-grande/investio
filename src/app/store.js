import { configureStore } from '@reduxjs/toolkit'
import chartDataReducer from '../features/chartDataSlice'
import navigationReducer from "../features/navigationSlice"

export default configureStore({
  reducer: {
    chart_data: chartDataReducer,
    navigation: navigationReducer,
  }
})