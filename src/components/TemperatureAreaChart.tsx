import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Sample data
const data = [
    { name: 'Day 1', temperature: 22 },
    { name: 'Day 2', temperature: 24 },
    { name: 'Day 3', temperature: 21 },
    { name: 'Day 4', temperature: 26 },
    { name: 'Day 5', temperature: 25 },
    { name: 'Day 6', temperature: 28 },
    { name: 'Day 7', temperature: 27 },
];

export default function TemperatureAreaChart() {
    return (
        <div className='temperature_area_chart'>
            <ResponsiveContainer>
                <AreaChart data={data} margin={{ top: 0, right: 5, left: 5, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="20%" stopColor="#C140D7" stopOpacity={1} />
                            <stop offset="80%" stopColor="#6830D0" stopOpacity={1} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="transparent" />
                    <Tooltip contentStyle={{ backgroundColor: '#000' }} />
                    <Legend verticalAlign="bottom" height={0} content={<CustomLegend />} />
                    <Area type="monotone" dataKey="temperature" stroke="white" fillOpacity={1} fill="url(#colorTemp)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

function CustomLegend() {
    return <div className='text-center font-medium py-1'>Temperture</div>
}