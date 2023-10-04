const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  transactionType: {
    type: String,
    enum: ["sell", "buy"],
    required: [true, "Transaction type is required."],
  },
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  category: {
    type: String,
    enum: [
      "baby_sitting", "house_moving", "household", "pet_care", "miscellaneous", "plumber"
    ],
    required: [true, "Category is required."],
  },
  description: {
    type: String,
    required: [true, "Description is required."],
  },
  position: {
    address: {
      type: String,
      required: [true, "Address is required."],
    },
    state: {
      type: String,
      enum: [
        "Ariana", "Beja", "Ben_Arous", "Bizerte", "Gabes",
        "Gafsa", "Jendouba", "Kairouan", "Kasserine", "Kebili",
        "Kef", "Mahdia", "Manouba", "Medenine", "Monastir",
        "Nabeul", "Sfax", "Sidi_Bouzid", "Siliana", "Sousse",
        "Tataouine", "Tozeur", "Tunis", "Zaghouan"
      ],
      required: [true, "State is required."],
    },
  },
  applicants: {
    type:[mongoose.Schema.Types.ObjectId],
    ref:'User'
  },
  selectedApplicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default:null
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["pending", "ongoing", "completed"],
    default: "pending",
  },
  rate: {
    type: Number,
    min: 0,
    max: 10,
    default: null,
  },
});

const Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;
