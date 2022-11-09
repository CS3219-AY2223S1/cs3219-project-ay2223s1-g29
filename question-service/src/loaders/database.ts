import mongoose, { Connection, createConnection} from "mongoose";
import config from "../config";

const connect =async (): Promise<void> => {
    const dbUrl = config.database.url

    try {
        await mongoose.connect(dbUrl)
        console.log(`connected to MongoDB at ${dbUrl}`)
    } catch (err) {
        console.log(`cannot connect to MongoDB at ${dbUrl}`, err);
    }
};

const database = {
    connect,
};

export {database as default}