import dotenv from "dotenv";
import { Pool } from "pg";
import Logger from "./logger"



// Load environment variables into process.env
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
}

const state = {
    pool: null as Pool | null
};

const connect = async () => {
    // create a new pool using environment variables
    state.pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        },
        max: 5,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000
    });
    state.pool.on("error", (err: any) => {
        Logger.error("PostgreSQL pool error:", err);
    });

    Logger.info("Successfully connected to the database");
    return;
};

const getPool = () => {
    if (!state.pool) {
        throw new Error("DB not initialized");
    }
    return state.pool;
};




export { connect, getPool };