import { Cloud, CloudFog, SunSnow } from "lucide-react";

export default function PopularCities() {

    const cities = [
        {
            name: "Delhi",
            description: "Partly Cloudy",
            icon: <Cloud />
        },
        {
            name: "Bangalore",
            description: "Sunny",
            icon: <SunSnow />
        },
        {
            name: "Pune",
            description: "Cloudy",
            icon: <CloudFog />
        },
        {
            name: "Mumbai",
            description: "Cloudy",
            icon: <CloudFog />
        },
        {
            name: "Hyderabad",
            description: "Cloudy",
            icon: <CloudFog />
        }
    ]


    return (
        <div className="popular_cities">
            <span className="font-semibold">Popular Cities</span>
            <div className="mt-4 flex-1 flex flex-col justify-between">
                {cities.map((city, index) => (
                    <CitiesItem key={index} {...{ ...city }} />
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
        <div className="flex gap-4 font-medium">
            {icon}
            <span className="flex-1">{name}</span>
            <span className="flex-1 flex justify-end">{description}</span>
        </div>
    )
}
