import { CloudSun, Wind, } from "lucide-react";
import { useContext } from "react";
import Context from "../data/GlobalModel";

export default function CityWeather() {

    const { weatherInfo } = useContext(Context);
    console.log(weatherInfo)
    return (
        <div className="city__weather__card">
            <div className="flex flex-col gap-1">
                <span className="font-bold text-2xl">{weatherInfo.name}</span>
                <span className="text-lg">8:44 PM</span>
            </div>
            <div className="flex items-center" >
                <CloudSun className="size-28" />
                <div className="city__weather__card__temperature">
                    <span className="text-6xl">{KelvinToCelsius(weatherInfo.main.temp)}°</span>
                    <span className="text-sm capitalize">{weatherInfo.weather[0].description}</span>
                </div>
            </div>
            <div className="grid grid-cols-4 justify-items-center">
                <WeatherInfo />
                <WeatherInfo />
                <WeatherInfo />
                <WeatherInfo />
            </div>
        </div>
    )
}


function WeatherInfo() {
    return <div className="text-lg flex flex-col items-center gap-2 font-medium">
        <Wind className="size-10" />
        173
    </div>
}

function KelvinToCelsius(kelvin: number) {
    return Math.round(kelvin - 273.15);
}