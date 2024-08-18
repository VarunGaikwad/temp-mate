import { CloudSun, Wind, } from "lucide-react";

export default function CityWeather() {
    return (
        <div className="city__weather__card">
            <div className="flex flex-col gap-1">
                <span className="font-bold text-2xl">Current Weather</span>
                <span className="text-lg">8:44 PM</span>
            </div>
            <div className="flex items-center" >
                <CloudSun className="flex-1 h-28" />
                <div className="city__weather__card__temperature">
                    <span className="text-6xl">15°</span>
                    <span>Cloudy</span>
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