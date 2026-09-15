import axios from "axios";
import AI_SERVICE_URL from "../config/ai.js";


const callAIService = async (endpoint, data) => {

    try {

        const response = await axios.post(
            `${AI_SERVICE_URL}${endpoint}`,
            data,
            {
                timeout: 30000
            }
        );

        return response.data;

    } catch (error) {

        if (error.response) {

            console.error(
                `AI Service Error [${endpoint}]:`,
                error.response.data
            );

        } else if (error.request) {

            console.error(
                `AI Service Unreachable [${endpoint}]:`,
                error.message
            );

        } else {

            console.error(
                `AI Service Request Error [${endpoint}]:`,
                error.message
            );
        }

        throw error;
    }
};


export const predictRisk = async (data) => {

    return await callAIService(
        "/predict-risk",
        data
    );
};


export const predictDelay = async (data) => {

    return await callAIService(
        "/predict-delay",
        data
    );
};


export const recommendResource = async (data) => {

    return await callAIService(
        "/recommend-resource",
        data
    );
};