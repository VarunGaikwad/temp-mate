export default function WeatherCode(weather_code: number) {
    const weatherDescriptions: { [key: string]: string } = {
        // Group 00-19: No significant weather
        "00": "Clear sky",
        "01": "Mainly clear",
        "02": "Partly cloudy",
        "03": "Cloudy",
        "10": "Mist",
        "11": "Patches of fog",
        "12": "Fog",
        "18": "Thunderstorm without precipitation",

        // Group 20-29: Precipitation
        "20": "Drizzle",
        "21": "Rain",
        "22": "Snow",
        "23": "Snow and rain",
        "24": "Freezing rain",
        "25": "Showers",

        // Group 30-39: Visibility issues
        "30": "Dust or sand",
        "31": "Duststorm",
        "32": "Sandstorm",
        "33": "Blowing snow",
        "34": "Low drifting snow",
        "35": "Blowing dust or sand",

        // Group 40-49: Fog and mist
        "40": "Fog",
        "41": "Fog in patches",
        "42": "Fog, sky not discernible",
        "43": "Fog in past hour",
        "44": "Fog thinning",
        "45": "Fog, sky visible",

        // Group 50-99: Precipitation and severe weather
        "50": "Drizzle",
        "51": "Light drizzle",
        "52": "Moderate drizzle",
        "53": "Dense drizzle",
        "54": "Light freezing drizzle",
        "55": "Moderate freezing drizzle",
        "56": "Dense freezing drizzle",
        "57": "Drizzle and rain",
        "58": "Drizzle and snow",
        "60": "Light rain",
        "61": "Moderate rain",
        "62": "Heavy rain",
        "63": "Light freezing rain",
        "64": "Moderate freezing rain",
        "65": "Heavy freezing rain",
        "66": "Rain and snow",
        "67": "Rain and hail",
        "68": "Snow",
        "69": "Hail",
        "70": "Light snow",
        "71": "Moderate snow",
        "72": "Heavy snow",
        "73": "Snow pellets",
        "74": "Hail",
        "75": "Thunderstorm",
        "76": "Lightning",
        "77": "Thunder",
        "78": "Squall",
        "79": "Tornado",

        // Undefined codes
        "99": "Severe weather warning",
    },
        code = (weather_code > 10 ? weather_code : "0" + weather_code);
    return weatherDescriptions[code] || "Unknown weather code";
}