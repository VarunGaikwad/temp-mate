import { useContext } from "react"
import Context from "../data/GlobalModel"
import { Sun, Cloud, CloudRain, CloudSnow, CloudDrizzle, CloudFog, Zap } from 'lucide-react';

export default function Forecast() {

    const { weatherInfo: { daily: { time, temperature_2m_max, temperature_2m_min, weather_code }, timezone } } = useContext(Context),
        array = Array.from(Array(7).keys());
    return (
        <div className="forcast">
            <span className="font-semibold">Forecast</span>
            <div className="mt-4 flex-1 flex flex-col justify-between">
                {array.map((item, index) => <ForecastItem key={item} temperature={`${temperature_2m_max[index]}° / ${temperature_2m_min[index]}°`} date={
                    new Date(time[index]).toLocaleDateString("en-US", { timeZone: timezone, day: 'numeric', month: 'short', weekday: 'short' })
                } icon={GetLucideIconByWMO(weather_code[index])} />)}
            </div>
        </div>
    )
}

type TForecastItem = {
    temperature: string
    date: string
    icon: any
}

function ForecastItem({ temperature, date, icon }: TForecastItem) {
    return (
        <div className="flex gap-4 font-medium">
            {icon}
            <span className="flex-1">{temperature}</span>
            <span className="flex-1 flex justify-end">{date}</span>
        </div>
    )
}

function GetLucideIconByWMO(wmo_code: number) {
    const iconMap: { [key: string]: JSX.Element } = {
        "0": <Sun />,
        "1": <Sun />,
        "2": <Cloud />,
        "3": <Cloud />,
        "45": <CloudFog />,
        "48": <CloudFog />,
        "51": <CloudDrizzle />,
        "53": <CloudDrizzle />,
        "55": <CloudDrizzle />,
        "61": <CloudRain />,
        "63": <CloudRain />,
        "65": <CloudRain />,
        "71": <CloudSnow />,
        "73": <CloudSnow />,
        "75": <CloudSnow />,
        "80": <CloudRain />,
        "81": <CloudRain />,
        "82": <CloudRain />,
        "95": <Zap />,
        "96": <Zap />,
        "99": <Zap />,
    };

    return iconMap[wmo_code] || <Cloud />;
}