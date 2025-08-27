"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartServer = void 0;
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const StartServer = async () => {
    app_1.default.listen(PORT, () => {
        console.log(`Banking API running on port ${PORT}`);
    });
    process.on("uncaughtException", async (err) => {
        console.log(err);
        process.exit(1);
    });
};
exports.StartServer = StartServer;
(0, exports.StartServer)().then(() => {
    console.log("Server is Up!...");
});
