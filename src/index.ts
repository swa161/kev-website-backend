import { connect } from './config/db'
import express from './config/express'
import Logger from './config/logger'

const app = express();

async function main() {
    try {
        await connect();
        app.listen(process.env.PGPORT || 3000, ()=> {
            Logger.info('Server started on port ' + process.env.PGPORT || 3000);
        });
    } catch (err) {
        Logger.error("Unable to connect to the database");
        process.exit(1);
    }

}

main().catch(err => Logger.error(err));