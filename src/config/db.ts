import dotenv from "dotenv";
import { Pool } from "pg";
import Logger from "./logger"



// Load environment variables into process.env
dotenv.config();

const state = {
    pool: null as Pool | null
};

const connect = async () => {
    // create a new pool using environment variables
    state.pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    await state.pool.connect();
    Logger.info("Successfully connected to the database");
    return;
};

const getPool =  () => {
  return state.pool;
};

export {connect, getPool};