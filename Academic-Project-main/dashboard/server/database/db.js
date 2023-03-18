import mongoose from 'mongoose';

const Connection = async (userName, password) => {
    const localURL = "mongodb://127.0.0.1:27017/AP-app";
    //const liveURL =`mongodb://${userName}:${password}@ac-w89utgh-shard-00-00.1gz0uss.mongodb.net:27017,ac-w89utgh-shard-00-01.1gz0uss.mongodb.net:27017,ac-w89utgh-shard-00-02.1gz0uss.mongodb.net:27017/CRUD-app?ssl=true&replicaSet=atlas-ikne7s-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        mongoose.set('strictQuery',false);
        mongoose.connect(localURL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log("Connected to database succesfully.");
    } catch (error) {
        console.log(error);
    }
}

export default Connection;