import dotenv from "dotenv";
dotenv.config();

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    server_url: process.env.SERVER_URL_LOCAL,
    mongoose: {
        url: process.env.MONGODB_URL || "mongodb://localhost:27017/eccomerce",
        options: { useNewUrlParser: true, useUnifiedTopology: true },
    },
}