"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
const decks_1 = __importDefault(require("./routes/api/decks"));
const users_1 = __importDefault(require("./routes/api/users"));
const app = (0, express_1.default)();
const dist_folder = __dirname + (process.env.clientDIST || "/../client_dist/");
app.use((0, connect_history_api_fallback_1.default)());
app.use(express_1.default.static(dist_folder));
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/decks", decks_1.default);
app.use("/api/users", users_1.default);
app.get('/', (req, res) => {
    res.sendFile(dist_folder + "index.html");
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map