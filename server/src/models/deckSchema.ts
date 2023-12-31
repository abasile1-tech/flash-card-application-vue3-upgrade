import {Schema, Types} from "mongoose";

import {cardSchema} from "./cardSchema";

export const deckSchema = new Schema({
  userId: {type: Types.ObjectId, required: true},
  deckName: String,
  cards: [cardSchema] || [] as typeof undefined[],
});
