import { useContext } from 'react';
import { AreaChart, Area, CartesianGrid, Tooltip, ResponsiveContainer, Legend, TooltipProps } from 'recharts';
import Context from '../data/GlobalModel';


export default function TemperatureAreaChart() {

    const { weatherInfo: { hourly: { time, temperature_2m }, timezone } } = useContext(Context),
        array = Array.from(Array(168).keys()),
        newData = array.map((_, index) => {
            return { name: new Date(time[index]).toLocaleDateString("en-US", { timeZone: timezone, day: 'numeric', month: 'short', weekday: 'short' }), temperature: temperature_2m[index] }
        })

    return (
        <div className='temperature_area_chart'>
            <ResponsiveContainer>
                <AreaChart data={newData} margin={{ top: 0, right: 5, left: 5, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="20%" stopColor="#C140D7" stopOpacity={1} />
                            <stop offset="80%" stopColor="#6830D0" stopOpacity={1} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="transparent" />
                    <Tooltip content={<CustomTooltip />} contentStyle={{ backgroundColor: '#000' }} />
                    <Legend verticalAlign="bottom" height={0} content={<CustomLegend />} />
                    <Area type="monotone" dataKey="temperature" stroke="white" fillOpacity={.75} fill="url(#colorTemp)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

function CustomLegend() {
    return <div className='text-center font-medium py-1'>Temperture</div>
}

interface CustomTooltipProps extends TooltipProps<any, any> { }

function CustomTooltip({ payload }: CustomTooltipProps) {
    if (payload && payload.length) {
        const { name, temperature } = payload[0].payload;
        return (
            <div className='text-center font-medium p-2 bg-black rounded-xl'>
                <div>{name}</div>
                <div>Temperature: {temperature}°C</div>
            </div>
        );
    }
    return null;
}