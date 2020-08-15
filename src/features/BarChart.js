import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

// const MyResponsiveBar = ({ data /* see data tab */ }) => (
export function BarChart ( props ) {
    var vals = props;
    return (
        <div style={{height: "80vh" , width: "100vh"}} className="m-auto row justify-content-center">
        <div className="row justify-content-center"><h3>Stocks</h3></div>
                <ResponsiveBar
                data={vals.data}
                keys={[ 'value' ]}
                indexBy="id"
                margin={{ top: 50, right: 150, bottom: 50, left: 60 }}
                padding={0.3}
                groupMode="grouped"
                layout="horizontal"
                colors={{ scheme: 'nivo' }}
                colorBy="indexValue"
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                axisTop={{ tickSize: 9, tickPadding: 11, tickRotation: 0, legend: '', legendOffset: 36 }}
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
                legends={[]}
                motionStiffness={90}
                motionDamping={15}
            />
        </div>
    )

    }