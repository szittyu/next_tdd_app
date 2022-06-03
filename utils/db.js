import mongoose, { connection } from "mongoose";

const connect = {};

async function connectDB() {
    if (connect.isConnected) {
        console.log("Already connected")
        return;
    }

    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            console.log("Use previous connection");
            return;
        }
        await mongoose.disconnect();
    }

    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log("New connection");
    connection.isConnected = mongoose.connections[0].readyState;
}

async function disconnectDB() {
    if (connect.isConnected) {
        if (process.env.NODE_ENV === "production") {
            await mongoose.disconnect();
            connection.isConnected = false;
        } else {
            console.log("Not disconnected")
        }
    }
}

const db = { connectDB, disconnectDB };
export default db;