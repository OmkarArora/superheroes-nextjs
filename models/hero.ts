import mongoose, { Schema, model, models } from "mongoose";

// const mongoose = require("mongoose");

const HeroSchema = new Schema({
  superhero: {
    type: String,
    required: [true, "PLeae name the hero"],
    unique: true,
    trim: true,
  },
  realName: {
    type: String,
    required: true,
    maxlength: [200, "Please keep real name short"],
  },
});

// For Nextjs: If model is already creatd refer it from models OR create it.
export default models.Hero || model("Hero", HeroSchema);
