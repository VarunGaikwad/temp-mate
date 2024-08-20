import cities from "../data/cities.json";
type TPullWeatherInfo = {
  lat: number;
  lon: number;
};


export default async function PullWeatherInfo({ lat, lon }: TPullWeatherInfo) {
  const params = {
    "latitude": lat.toString(),
    "longitude": lon.toString(),
    "current": ["temperature_2m", "relative_humidity_2m", "is_day", "rain", "weather_code", "wind_speed_10m", "precipitation", "cloud_cover", "surface_pressure", "wind_direction_10m"].toString(),
    "daily": ["temperature_2m_max", "temperature_2m_min", "weather_code", "sunrise", "sunset"].toString(),
    "hourly": ["rain", "temperature_2m", "wind_speed_10m"].toString(),
    "timezone": "auto",
  },
    queryString = new URLSearchParams(params).toString(),
    url = `https://api.open-meteo.com/v1/forecast?${queryString}`,
    location_name_url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
    weather = await fetch(url).then((res) => res.json()),
    location = await fetch(location_name_url).then((res) => res.json()),
    maxDistance = 500;

  weather["location"] = location;

  const nearCities = (cities as Array<{
    "name": String,
    "latitude": Float32Array,
    "longitude": Float32Array,
    "country": String,
    "population": Number
  }>).filter(city => {
    if (location.display_name.includes(city.name)) {
      return false
    }

    const distance = haversineDistance(location.lat, location.lon, Number(city.latitude), Number(city.longitude));
    return distance <= maxDistance;
  }).slice(0, 5),
    promise = await Promise.all(nearCities.map((city) => fetch(`https://api.open-meteo.com/v1/forecast?${new URLSearchParams({
      "latitude": city.latitude.toString(),
      "longitude": city.longitude.toString(),
      "current": "weather_code",
    }).toString()}`).then((res) => res.json())));

  weather["near_cities"] = promise.map((item, index) => { return { ...item, "name": nearCities[index].name } });

  return weather;
}



function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}