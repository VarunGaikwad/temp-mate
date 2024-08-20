import { Cloud, CloudDrizzle, CloudFog, CloudRain, CloudSnow, Sun, Zap } from "lucide-react";
import { useContext } from "react";
import Context from "../data/GlobalModel";
import WeatherCode from "../data/WeatherCode";

export default function PopularCities() {
    const { weatherInfo: { near_cities } } = useContext(Context);

    return (
        <div className="popular_cities">
            <span className="font-semibold">Popular Cities</span>
            <div className="mt-4 flex-1 flex flex-col justify-between">
                {near_cities.map((city: any, index: number) => (
                    <CitiesItem key={index} name={city.name} icon={GetLucideIconByWMO(city.current.weather_code)} description={WeatherCode(city.current.weather_code)} />
                ))}
            </div>
        </div>
    )
}

type TCitiesItem = {
    name: string;
    description: string;
    icon: any;
}
function CitiesItem({ name, description, icon }: TCitiesItem) {
    return (
        <div className="flex gap-2 font-medium text-sm items-center">
            {icon}
            <span className="flex-1">{name}</span>
            <span className="flex-1 flex justify-end">{description}</span>
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