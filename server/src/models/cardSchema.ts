import {Schema} from "mongoose";

export const cardSchema = new Schema({
  cardFront: String,
  cardBack: String,
});