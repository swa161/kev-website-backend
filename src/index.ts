import { connect } from './config/db'
import express from './config/express'
import Logger from './config/logger'

const app = express();
const port = 4941;
async function main() {
    try {
        await connect();
        app.listen(port, ()=> {
            Logger.info('Server started on port ' + port);
        });
    } catch (err) {
        Logger.error("Unable to connect to the database");
        process.exit(1);
    }

}

main().catch(err => Logger.error(err));