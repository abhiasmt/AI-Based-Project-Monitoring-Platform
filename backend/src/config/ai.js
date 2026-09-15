import "dotenv/config";

const AI_SERVICE_URL =
    process.env.AI_SERVICE_URL || "http://localhost:8000";

export default AI_SERVICE_URL;