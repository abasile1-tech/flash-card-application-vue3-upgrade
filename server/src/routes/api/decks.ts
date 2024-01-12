import express from "express";
import mongoose, { Types} from "mongoose";

const router = express.Router();

import {deckSchema} from "../../models/deckSchema";

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const dotenv = require("dotenv");

  const result = dotenv.config();

  if (result.error) {
    throw result.error;
  }
}

const url = process.env.mongoURL;
mongoose
  .connect(url)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

const Deck = mongoose.model("Deck", deckSchema, "decks");

// Get Decks
router.get("/:id", async (req, res) => {
  res.send(await Deck.find({ userId: new mongoose.Types.ObjectId(req.params.id) }));
});

// Get Deck after page reload
router.get("/deck/:id", async (req, res) => {
  res.send(await Deck.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) }));
});

// Add Deck
router.post("/", async (req, res) => {
  try {
    const deck = new Deck();
    deck.deckName = req.body.deckName;
    deck.userId = req.body.userId;
    deck.cards = [];
    await deck.save();
    res.status(201).json(deck);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving the deck.");
  }
});

// Delete Deck
router.delete("/:id/deckName", async (req, res) => {
  try {
    await Deck.findByIdAndDelete(req.params.id);
    res.status(200).send();
  } catch (err) {
    console.log(err);
  }
});

// Delete Decks
router.delete("/:id", async (req, res) => {
  try {
    const decks = await Deck.find({
      userId: new Types.ObjectId(req.params.id),
    });
    for (let i = 0; i < decks.length; i++) {
      await decks[i].deleteOne();
    }
    res.status(200).send();
  } catch (err) {
    console.log(err);
  }
});

// Edit Deck
router.put("/:id/deckName", async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    deck.deckName = req.body.deckName;
    await deck.save(); 
    res.status(201).json(deck);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving the deck.");
  }
});

// Add Card
router.post("/:id/cards/:cardsListIndex", async (req, res) => {
  const deck = await Deck.findById(req.params.id);
  // if there are no cards or only one card, add the new card to the end
  if (deck.cards.length === 0 || deck.cards.length === 1) {
    deck.cards.push({
      cardFront: req.body.cardFront,
      cardBack: req.body.cardBack,
    });
  }
  // if we are at the end already, add the card to the end
  else if (
    deck.cards.length > 1 &&
    deck.cards.length - parseInt(req.params.cardsListIndex) === 1
  ) {
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
    await deck.save(); 
    res.status(201).json(deck);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving the deck.");
  }
});

// Edit Card Front
router.put("/:id/cards/front/:cardId/:cardsListIndex", async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    deck.cards[req.params.cardsListIndex] = {
      cardFront: req.body.cardFront,
      cardBack: req.body.cardBack,
    };
    await deck.save(); 
    res.status(201).json(deck);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving the deck.");
  }
});

// Edit Card Back
router.put("/:id/cards/back/:cardId/:cardsListIndex", async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    deck.cards[req.params.cardsListIndex] = {
      cardFront: req.body.cardFront,
      cardBack: req.body.cardBack,
    };
    await deck.save(); 
    res.status(201).json(deck);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving the deck.");
  }
});

// Delete Card
router.delete("/:id/cards/:cardId", async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);

    // Find the index of the card with the specified ID
    const cardIndex = deck.cards.findIndex(card => card._id.toString() === req.params.cardId);

    if (cardIndex !== -1) {
      // Remove the card from the array
      deck.cards.splice(cardIndex, 1);
      await deck.save();
      res.status(201).json(deck);
    } else {
      res.status(404).send("Card not found.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving the deck.");
  }
});

export default router;
