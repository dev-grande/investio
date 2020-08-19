import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

export function BarChart ( props ) {
    var vals = props;
    return (
        // <div style={{height: "68vh" , width: "55vw"}} className="m-auto row justify-content-center">
        <div style={{height: "39vh" , width: "30vw"}} className="m-auto row justify-content-center">
        <div className="row justify-content-center"><h3>Stocks</h3></div>
                <ResponsiveBar
                data={vals.data}
                keys={[ 'value' ]}
                indexBy="id"
                margin={{ top: 10, right: 10, bottom: 30, left: 50 }}
                padding={0.3}
                groupMode="grouped"
                layout="horizontal"
                colors={{ scheme: 'nivo' }}
                colorBy="indexValue"
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                // axisTop={{ tickSize: 9, tickPadding: 11, tickRotation: 0, legend: '', legendOffset: 36 }}
                axisRight={null}
                axisBottom={null}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                enableGridX={true}
                enableGridY={false}
                enableLabel={false}
                legends={[]}
                motionStiffness={90}
                motionDamping={15}
            />
        </div>
    )

    }