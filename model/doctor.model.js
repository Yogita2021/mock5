const mongoose = require("mongoose");

const appointmentShema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  specialization: {
    type: String,
    enum: ["Cardiologist", "Dermatologist", "Pediatrician", "Psychiatrist"],
  },
  experience: { type: Number },
  location: { type: String },
  date: { type: String },
  slots: { type: Number },
  fee: { type: Number },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});
const Appointment = mongoose.model("appointment", appointmentShema);
module.exports = { Appointment };

// {
// 	  "name": "Jane Doe",
// 	  "image": "https://example.com/doctor-image.jpg",
// 	  "specialization": "Dermatologist",
// 	  "experience": 10,
// 	  "location": "Los Angeles",
// 	  "date": "2023-04-05T12:00:00.000Z",
// 		"slots" : 2,
// 	  "fee": 150
// 	}
