"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importStar(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const router = express_1.default.Router();
const deckSchema_1 = require("../../models/deckSchema");
if (process.env.NODE_ENV !== 'production') {
    const result = dotenv_1.default.config();
    if (result.error) {
        throw result.error;
    }
}
const url = process.env.mongoURL;
mongoose_1.default
    .connect(url)
    .then(() => console.log('Database connected!'))
    .catch((err) => console.log(err));
const Deck = mongoose_1.default.model('Deck', deckSchema_1.deckSchema, 'decks');
// Get Decks
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield Deck.find({ userId: new mongoose_1.default.Types.ObjectId(req.params.id) }));
}));
// Get Deck after page reload
router.get('/deck/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield Deck.findOne({ _id: new mongoose_1.default.Types.ObjectId(req.params.id) }));
}));
// Add Deck
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deck = new Deck();
        deck.deckName = req.body.deckName;
        deck.userId = req.body.userId;
        deck.cards = [];
        yield deck.save();
        res.status(201).json(deck);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Error saving the deck.');
    }
}));
// Delete Deck
router.delete('/:id/deckName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Deck.findByIdAndDelete(req.params.id);
        res.status(200).send();
    }
    catch (err) {
        console.log(err);
    }
}));
// Delete Decks
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decks = yield Deck.find({
            userId: new mongoose_1.Types.ObjectId(req.params.id),
        });
        for (let i = 0; i < decks.length; i++) {
            yield decks[i].deleteOne();
        }
        res.status(200).send();
    }
    catch (err) {
        console.log(err);
    }
}));
// Edit Deck
router.put('/:id/deckName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deck = yield Deck.findById(req.params.id);
        deck.deckName = req.body.deckName;
        yield deck.save();
        res.status(201).json(deck);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Error saving the deck.');
    }
}));
// Add Card
router.post('/:id/cards/:cardsListIndex', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deck = yield Deck.findById(req.params.id);
    // if there are no cards or only one card, add the new card to the end
    if (deck.cards.length === 0 || deck.cards.length === 1) {
        deck.cards.push({
            cardFront: req.body.cardFront,
            cardBack: req.body.cardBack,
        });
    }
    // if we are at the end already, add the card to the end
    else if (deck.cards.length > 1 &&
        deck.cards.length - parseInt(req.params.cardsListIndex) === 1) {
        deck.cards.push({
            cardFront: req.body.cardFront,
            cardBack: req.body.cardBack,
        });
    }
    // if we are in the middle of the deck, insert the card immediately after the current card
    else {
        deck.cards.splice(parseInt(req.params.cardsListIndex) + 1, 0, {
            cardFront: req.body.cardFront,
            cardBack: req.body.cardBack,
        });
    }
    try {
        yield deck.save();
        res.status(201).json(deck);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Error saving the deck.');
    }
}));
// Edit Card Front
router.put('/:id/cards/front/:cardId/:cardsListIndex', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deck = yield Deck.findById(req.params.id);
        deck.cards[req.params.cardsListIndex] = {
            cardFront: req.body.cardFront,
            cardBack: req.body.cardBack,
        };
        yield deck.save();
        res.status(201).json(deck);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Error saving the deck.');
    }
}));
// Edit Card Back
router.put('/:id/cards/back/:cardId/:cardsListIndex', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deck = yield Deck.findById(req.params.id);
        deck.cards[req.params.cardsListIndex] = {
            cardFront: req.body.cardFront,
            cardBack: req.body.cardBack,
        };
        yield deck.save();
        res.status(201).json(deck);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Error saving the deck.');
    }
}));
// Delete Card
router.delete('/:id/cards/:cardId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deck = yield Deck.findById(req.params.id);
        // Find the index of the card with the specified ID
        const cardIndex = deck.cards.findIndex((card) => card._id.toString() === req.params.cardId);
        if (cardIndex !== -1) {
            // Remove the card from the array
            deck.cards.splice(cardIndex, 1);
            yield deck.save();
            res.status(201).json(deck);
        }
        else {
            res.status(404).send('Card not found.');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Error saving the deck.');
    }
}));
exports.default = router;
//# sourceMappingURL=decks.js.map