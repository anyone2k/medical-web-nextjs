import mongoose, { Schema, Document, Model } from "mongoose";

// Interface TypeScript pour le modèle Schedule
export interface ISchedule extends Document {
  doctor: mongoose.Types.ObjectId;
  appointments: mongoose.Types.ObjectId[];
  addAppointment: (appointment: mongoose.Types.ObjectId) => Promise<ISchedule>;
  removeAppointment: (schId: mongoose.Types.ObjectId) => Promise<ISchedule>;
}

// Schéma Mongoose pour le modèle Schedule
const scheduleSchema = new Schema<ISchedule>({
  appointments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      default: [],
    },
  ],
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
});

// Ajouter une méthode pour ajouter un rendez-vous
scheduleSchema.methods.addAppointment = function (
  appointment: mongoose.Types.ObjectId
) {
  const updatedAppointments = [...this.appointments, appointment];
  this.appointments = updatedAppointments;
  return this.save();
};

// Ajouter une méthode pour supprimer un rendez-vous
scheduleSchema.methods.removeAppointment = function (schId: mongoose.Types.ObjectId) {
  const updatedAppointments = this.appointments.filter((item: mongoose.Types.ObjectId) => {
    return item.toString() !== schId.toString();
  });
  this.appointments = updatedAppointments;
  return this.save();
};


// Exporter le modèle
const Schedule: Model<ISchedule> = mongoose.model("Schedule", scheduleSchema);
export default Schedule;
