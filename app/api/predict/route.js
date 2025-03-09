import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
    try {
        const body = await request.json();

        // Input validation
        if (!body || Object.keys(body).length === 0) {
            return NextResponse.json(
                { error: "Input data is required." },
                { status: 400 }
            );
        }

        // Convert string fields to integers where required
        const convertedBody = {
            id: parseInt(body.id, 10),
            name: body.name,
            statuses_count: parseInt(body.statuses_count, 10),
            followers_count: parseInt(body.followers_count, 10),
            friends_count: parseInt(body.friends_count, 10),
            favourites_count: parseInt(body.favourites_count, 10),
            listed_count: parseInt(body.listed_count, 10),
            geo_enabled: parseInt(body.geo_enabled, 10),
            profile_use_background_image: parseInt(body.profile_use_background_image, 10),
            lang: "en"
        };

        // Send data to the ML model API
        const response = await axios.post(
            " https://0d25-35-194-49-43.ngrok-free.app/predict",
            convertedBody
        );

        if (response.status !== 200) {
            return NextResponse.json(
                { error: "Failed to fetch prediction from ML model API." },
                { status: 500 }
            );
        }

        // Return the ML model's prediction
        return NextResponse.json(response.data, { status: 200 });

    } catch (error) {
        console.error("Prediction API error:", error);
        return NextResponse.json(
            { error: "An error occurred while processing the request." },
            { status: 500 }
        );
    }
}
