import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
} from "chart.js"

import { Line } from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
)

export default function ChartComponent() {

    const data = {

        labels: ["Jan", "Feb", "Mar", "Apr"],

        datasets: [

            {
                label: "Followers",

                data: [1000, 3000, 5000, 7000]
            }

        ]

    }

    return <Line data={data} />
}
