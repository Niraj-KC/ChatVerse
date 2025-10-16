process.on('uncaughtException', (err) => {
            console.error('❌ Uncaught Exception:', err);
        });

process.on('unhandledRejection', (reason) => {
            console.error('❌ Unhandled Rejection:', reason);
        });

import dotenv from "dotenv";
import { httpServer } from "./app.js";
import connectDB from "./utils/connectDb.js";
import { port } from "./utils/constants.js";
import logger from "./utils/logger.js";

dotenv.config();

connectDB()
    .then(() => {
        console.log('🚀 Starting server...');

        httpServer.listen(port, () => {
            logger.verbose("🙌😀 Server started on port:" + port);
        });
    })
    .catch((err) => {
        
        logger.error(
            "Some errror Occured while connecting to the database:" + err
        );
    });
