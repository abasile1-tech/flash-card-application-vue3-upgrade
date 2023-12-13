"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deckSchema = void 0;
const mongoose_1 = require("mongoose");
const cardSchema_1 = require("./cardSchema");
exports.deckSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Types.ObjectId, required: true },
    deckName: String,
    cards: [cardSchema_1.cardSchema] || [],
});
//# sourceMappingURL=deckSchema.js.map