import "dotenv/config";

const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",

  databaseUrl: process.env.DATABASE_URL,

  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",

  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",

  aiServiceUrl: process.env.AI_SERVICE_URL || "http://localhost:8000",
};

export default env;