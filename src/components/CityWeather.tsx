import { Droplet, Gauge, Thermometer, Wind, } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import Context from "../data/GlobalModel";
import DayCloud from "../assets/Day Clouds.svg";
import NightCloud from "../assets/Night Clouds.svg";
import DaySnow from "../assets/Day Snow.svg";
import NightSnow from "../assets/Night Snow.svg";
import DayStorm from "../assets/Day Storm.svg";
import NightStorm from "../assets/Night Storm.svg";
import DayWind from "../assets/Day Wind.svg";
import NightWind from "../assets/Night Wind.svg";
import DaySun from "../assets/Day Sun.svg";
import NightMoon from "../assets/Night Moon.svg";
import DayRain from "../assets/Day Rain.svg";
import NightRain from "../assets/Night Rain.svg";
import WeatherCode from "../data/WeatherCode";

export default function CityWeather() {
    const { weatherInfo } = useContext(Context),
        [time, setTime] = useState<string>("00:00");

    useEffect(() => {
        function CurrentTime(timeZone: string) {
            const date = new Date(), currentTime = date.toLocaleString("en-IN", {
                timeZone, hour12: false,
                hour: '2-digit', minute: '2-digit'
            });

            return currentTime;
        }

        const interval = setInterval(() => {
            setTime(CurrentTime(weatherInfo.timezone));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="city__weather__card">
            <div className="flex flex-col gap-1">
                <span className="font-bold text-xl">{DisplayName(weatherInfo.location.display_name)}</span>
                <span className="text-lg">{time}</span>
            </div>
            <div className="flex items-center" >
                <GetWeatherIcon {...{ main: weatherInfo.current.time, isDay: weatherInfo.current.is_day }} />
                <div className="city__weather__card__temperature">
                    <span className="text-6xl">{weatherInfo.current.temperature_2m}°</span>
                    <span className="text-sm capitalize">{WeatherCode(weatherInfo.current.weather_code)}</span>
                </div>
            </div>
            <div className="grid grid-cols-4 justify-items-center">
                <WeatherInfo Icon={<Gauge />} value={weatherInfo.current.surface_pressure + " " + weatherInfo.current_units.surface_pressure} />
                <WeatherInfo Icon={<Droplet />} value={weatherInfo.current.precipitation + " " + weatherInfo.current_units.precipitation} />
                <WeatherInfo Icon={<Wind />} value={weatherInfo.current.wind_speed_10m + " " + weatherInfo.current_units.wind_speed_10m} />
                <WeatherInfo Icon={<Thermometer />} value={Math.max(...weatherInfo.daily.temperature_2m_max) + " " + weatherInfo.daily_units.temperature_2m_max} />
            </div>
        </div>
    )
}

type TWeatherInfo = {
    value?: string;
    Icon: JSX.Element
}

function WeatherInfo({ Icon, value = "0" }: TWeatherInfo) {
    return <div className="text-sm flex flex-col items-center gap-2 font-medium">
        {Icon}
        {value}
    </div>
}

function DisplayName(name: string) {
    return name.split(", ").slice(0, -3).join(", ")
}

type TGetWeatherIcon = {
    main: string;
    isDay: boolean;
}
function GetWeatherIcon({ main, isDay }: TGetWeatherIcon) {
    const style = "size-32";
    switch (main) {
        case "Clear":
            return isDay ? <img className={style} src={DaySun} alt="Sun" /> : <img className={style} src={NightMoon} alt="Sun" />;
        case "Clouds":
            return isDay ? <img className={style} src={DayCloud} alt="Clouds" /> : <img className={style} src={NightCloud} alt="Clouds" />;
        case "Snow":
            return isDay ? <img className={style} src={DaySnow} alt="Snow" /> : <img className={style} src={NightSnow} alt="Snow" />;
        case "Rain":
            return isDay ? <img className={style} src={DayRain} alt="Rain" /> : <img className={style} src={NightRain} alt="Rain" />;
        case "Thunderstorm":
            return isDay ? <img className={style} src={DayStorm} alt="Storm" /> : <img className={style} src={NightStorm} alt="Storm" />;
        case "Drizzle":
            return isDay ? <img className={style} src={DayWind} alt="Wind" /> : <img className={style} src={NightWind} alt="Wind" />;
        default:
            return isDay ? <img className={style} src={DaySun} alt="Sun" /> : <img className={style} src={NightMoon} alt="Sun" />;

    }
}