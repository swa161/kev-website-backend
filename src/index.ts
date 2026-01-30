import { connect } from './config/db'
import express from './config/express'
import Logger from './config/logger'

const app = express();
const PORT = process.env.PORT || 3000;
async function main() {
    try {
        await connect();
        app.listen(PORT, ()=> {
            Logger.info('Server started on port ' + PORT);
        });
    } catch (err) {
        Logger.error("Unable to connect to the database");
        process.exit(1);
    }

}

main().catch(err => Logger.error(err));