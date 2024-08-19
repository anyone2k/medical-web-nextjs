import mongoose, { Schema, Document, Model } from "mongoose";

// Interface TypeScript pour le modèle Appointment
export interface IAppointment extends Document {
  patient: mongoose.Types.ObjectId;
  dayTime: Date;
  duration: number;
  reason: string;
  createdAt: Date;
}

// Schéma Mongoose pour le modèle Appointment
const AppointmentSchema: Schema<IAppointment> = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  dayTime: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: [true, "Please add a reason for the appointment"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Exporter le modèle
const Appointment: Model<IAppointment> = mongoose.model("Appointment", AppointmentSchema);
export default Appointment;
