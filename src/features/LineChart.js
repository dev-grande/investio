import React from 'react';
import { ResponsiveLine } from '@nivo/line'

export function LineChart ( props ) {
    var vals = props;
        return (
            <div style={{height: "50vh" , width: "100vh"}} className="m-auto row justify-content-center">
            <div className="row justify-content-center"><h3>{vals.title}</h3></div>

                <ResponsiveLine
                data={vals.data}
                margin={{ top: 35, right: 110, bottom: 110, left: 60 }}
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
                    // tickRotation: -90,
                  }}

                colors={{ scheme: 'set2' }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="y"
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[]}
            />


{/* <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[]}
    /> */}

        </div>
        )

}


