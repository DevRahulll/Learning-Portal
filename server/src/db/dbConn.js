import mongoose from "mongoose";

const connToDB = async () => {
    try {
        const connInstance = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB...", connInstance.connection.host);
    } catch (error) {
        console.log("Error in connecting DB!! ", error.message);
    }
};

export default connToDB;
