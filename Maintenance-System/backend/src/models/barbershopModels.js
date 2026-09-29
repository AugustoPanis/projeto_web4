const mongoose = require("mongoose");

const barbershopSchema = new mongoose.Schema(
  {
    nomeBarbearia: {
      type: String,
      required: true,
      trim: true,
    },
    responsavel: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    whatsapp: {
      type: String,
      required: true,
      trim: true,
    },
    cidade: {
      type: String,
      required: true,
      trim: true,
    },
    estado: {
      type: String,
      required: true,
      trim: true,
    },
    numeroCadeiras: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Barbershop", barbershopSchema);