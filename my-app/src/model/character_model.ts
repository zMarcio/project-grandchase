import mongoose, { Schema, Document } from "mongoose";
import { Character } from "@/interface/character_interface";

const CharacterSchema = new Schema({
  name_character: { type: String, required: true },
  age_character: { type: Number, required: true },
  description_character: { type: Array, required: true },
  type_character_mp: { type: String, required: true },
  image_character: { type: String, required: true },
  quantity_class: { type: Number, required: true },
  name_class_character: {
    name_class: { type: String, required: true },
    description_class: { type: String, required: true },
    image_class: { type: String, required: true },
  },
  habilities_mana: {
    name: { type: String, required: true },
    description: { type: String, required: true },
    quantity_mana: { type: Number, required: true },
    image_hability: { type: String, required: true },
  },
  habilities_no_mana: {
    name: { type: String, required: true },
    description_how_to_use: { type: String, required: true },
    image_hability: { type: String, required: true },
    commands: { type: Array, required: true },
  },
  name_weapon_character: {
    name_weapon: { type: String, required: true },
    class_character: { type: String, required: true },
    description_weapon: { type: String, required: true },
  },
});

const CharacterModel =
  mongoose.models.characterstest ||
  mongoose.model<Character & Document>("characterstest", CharacterSchema);

export default CharacterModel;
