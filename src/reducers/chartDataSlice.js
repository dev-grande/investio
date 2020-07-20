import { createSlice } from '@reduxjs/toolkit'

export const chartDataSlice = createSlice({
  name: 'chart_data',
  initialState: {
    data: []
  },
  reducers: {
    parse: (state, action) => {
        var data = action.payload;  
        var result = [];
        var colors = ["hsl(163, 70%, 50%)", "hsl(155, 70%, 50%)", "hsl(109, 70%, 50%)", "hsl(62, 70%, 50%)", "hsl(358, 70%, 50%)" ];
        var dates = []

        for (var ndx in data) {
        console.log(ndx);
        var vals = data[ndx].data;

            if (ndx == 0) {
                dates = vals;
                dates.shift();
            }
            else {
                var val1 = {};
                var row = vals;
                var id = row.shift();
                val1["id"] = id;
                val1["data"] = [];
                val1["color"] = colors[ndx];
                var date_ndx = 0;

                for (var val in row) {
                    var v = {}
                    v["x"] = dates[date_ndx]; 
                    v["y"] = Number(row[val]);
                    val1["data"].push(v);
                    date_ndx = date_ndx + 1;
                }
                result.push(val1); 
            }
        }

        console.log("after parse")
        console.log(result);
        state.data = result;
    }  // end of parse reducer declaration
  }
})

export const { parse } = chartDataSlice.actions;

export const selectData = state => state.chart_data.data;

export default chartDataSlice.reducer