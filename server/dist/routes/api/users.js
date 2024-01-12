"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
const userSchema_1 = require("../../models/userSchema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const dotenv = require("dotenv");
    const result = dotenv.config();
    if (result.error) {
        throw result.error;
    }
}
const url = process.env.mongoURL;
mongoose_1.default
    .connect(url)
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));
const User = mongoose_1.default.model("User", userSchema_1.userSchema, "users");
// Get Users
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userNameToBeFound = req.body.userName;
    const myPlaintextPassword = req.body.userPassword;
    try {
        const user = yield User.findOne({ userName: userNameToBeFound });
        if (!user) {
            // The user couldn't be found
            res.sendStatus(202);
        }
        else {
            const passwordMatch = yield bcrypt_1.default.compare(myPlaintextPassword, user.userPassword);
            if (passwordMatch) {
                res.send(user);
            }
            else {
                res.sendStatus(205);
            }
        }
    }
    catch (err) {
        console.error("Error finding user:", err);
        res.sendStatus(500); // Internal server error
    }
}));
// Get User after page reload
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield User.findOne({ _id: new mongoose_1.default.Types.ObjectId(req.params.id) }));
}));
// Add User
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userNameToBeFound = req.body.userName;
        const user = yield User.findOne({ userName: userNameToBeFound });
        if (!user) {
            // The userName doesn't yet exist
            const user = new User();
            user.userName = req.body.userName;
            const myPlaintextPassword = req.body.userPassword;
            bcrypt_1.default.hash(myPlaintextPassword, saltRounds, function (err, hash) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log("error hashing password:", err);
                    }
                    user.userPassword = hash;
                    try {
                        yield user.save();
                        res.status(201).json(user);
                    }
                    catch (err) {
                        console.log(err);
                        res.status(500).send("Error saving the user.");
                    }
                });
            });
            return;
        }
        if (user) {
            // The userName is already taken
            res.sendStatus(205);
            return;
        }
    }
    catch (err) {
        console.log(err);
    }
}));
// Delete User
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User.findByIdAndDelete(req.params.id);
        res.status(200).send();
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = router;
//# sourceMappingURL=users.js.map