import { useEffect, useState } from "react";
import CityWeather from "./components/CityWeather";
import Forecast from "./components/Forecast";
import Map from "./components/Map";
import PopularCities from "./components/PopularCities";
import TemperatureAreaChart from "./components/TemperatureAreaChart";
import WaitingView from "./components/WaitingView";
import PullWeatherInfo from "./data/pullWeatherInfo";
import Context from "./data/GlobalModel";

export default function App() {

  const [coordinates, setCoordinates] = useState<number[]>([]),
    [weatherInfo, setWeatherInfo] = useState({}),
    [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCoordinates([coords.latitude, coords.longitude])
    });
  }, []);

  useEffect(() => {
    const [lat, lon] = coordinates;
    if (!lat || !lon) return;
    setIsLoading(true);
    PullWeatherInfo({ lat: coordinates[0], lon: coordinates[1] }).then((data) => {
      setWeatherInfo(data);
      setIsLoading(false);
    });

  }, [coordinates]);

  if (coordinates.length === 0) {
    return <WaitingView type="location" />
  }

  if (isLoading) return <WaitingView type="fetching" />


  return (
    <Context.Provider value={{ weatherInfo }}>
      <main role="main">
        <CityWeather />
        <Map />
        <PopularCities />
        <Forecast />
        <TemperatureAreaChart />
      </main>
    </Context.Provider>

  )
}