import { Cloud } from "lucide-react"

export default function Forecast() {
    return (
        <div className="forcast">
            <span className="font-semibold">Forecast</span>
            <div className="mt-4 flex-1 flex flex-col justify-between">
                <ForecastItem temperature="24&deg;/22&deg;" date="25th Oct, Mon" icon={<Cloud />} />
                <ForecastItem temperature="24&deg;/22&deg;" date="25th Oct, Mon" icon={<Cloud />} />
                <ForecastItem temperature="24&deg;/22&deg;" date="25th Oct, Mon" icon={<Cloud />} />
                <ForecastItem temperature="24&deg;/22&deg;" date="25th Oct, Mon" icon={<Cloud />} />
                <ForecastItem temperature="24&deg;/22&deg;" date="25th Oct, Mon" icon={<Cloud />} />
                <ForecastItem temperature="24&deg;/22&deg;" date="25th Oct, Mon" icon={<Cloud />} />
                <ForecastItem temperature="24&deg;/22&deg;" date="25th Oct, Mon" icon={<Cloud />} />
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