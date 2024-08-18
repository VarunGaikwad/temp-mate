type TPullWeatherInfo = {
  lat: number;
  lon: number;
};


export default function PullWeatherInfo({ lat, lon }: TPullWeatherInfo) {
  const apiKey = "62eed293a0c805528321f894ecf5626b",
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  return fetch(url).then((response) => response.json());
}

