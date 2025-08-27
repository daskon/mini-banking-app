import expressApp from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

export const StartServer = async () => {
    expressApp.listen(PORT, () => {
        console.log(`Banking API running on port ${PORT}`);
    });

    process.on("uncaughtException", async (err)=>{
        console.log(err);
        process.exit(1);
    });
}

StartServer().then(()=>{
    console.log("Server is Up!...");
})