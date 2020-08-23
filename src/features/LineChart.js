import React from 'react';
import { ResponsiveLine } from '@nivo/line'

export function LineChart ( props ) {
    var vals = props;
        return (
            <div style={vals.div} className="m-auto row justify-content-center">
            <div style={{marginTop: '15px'}} className="row justify-content-center"><h3>{vals.title}</h3></div>

                <ResponsiveLine
                data={vals.data}
                margin={vals.margin}
                padding={0.3}
                xScale={{
                    type: "time",
                    format: "%Y-%m-%d"
                  }}
                xFormat="time:%m / %Y"
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                  axisTop={null}
                  axisRight={null}
                  axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "AMOUNT",
                    legendOffset: -40,
                    legendPosition: "middle"
                  }}
                  axisBottom={{
                    format: "%Y",
                    tickValues: "every year",
                    tickSize: 5,
                    tickPadding: 10,
                  }}

                colors={{ scheme: 'set2' }}
                pointSize={4}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={4}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="y"
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[]}
            />
        </div>
        )

}


