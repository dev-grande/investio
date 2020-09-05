import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

export function BarChart ( props ) {
    var vals = props;
    return (
        <div style={vals.dimension} className="m-auto row justify-content-center">
        <div className="row justify-content-center"><h3>{vals.title}</h3></div>
                <ResponsiveBar
                data={vals.data}
                keys={[ 'value' ]}
                indexBy="id"
                margin={vals.margin}
                padding={0.3}
                groupMode="grouped"
                layout={vals.layout}
                colors={{ scheme: 'nivo' }}
                colorBy="indexValue"
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                axisRight={null}
                axisBottom={vals.bottom}
                axisLeft={vals.left}
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