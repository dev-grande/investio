import { configureStore } from '@reduxjs/toolkit'
import chartDataReducer from '../features/chartDataSlice'

export default configureStore({
  reducer: {
    chart_data:  chartDataReducer,
  }
})