import mongoose, { Schema, Document } from "mongoose";

// Interface pour le schéma TypeScript
interface ISchedule extends Document {
  schedule: {
    appointments: mongoose.Types.ObjectId[];
  };
  doctor: mongoose.Schema.Types.ObjectId;
  addAppointment(appointment: mongoose.Types.ObjectId): Promise<ISchedule>;
  removeAppointment(schId: mongoose.Types.ObjectId): Promise<ISchedule>;
}

// Définition du schéma Mongoose
const scheduleSchema = new Schema<ISchedule>({
  schedule: {
    appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Appointment",
        default: [],
      },
    ],
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
});

// Ajout d'un rendez-vous
scheduleSchema.methods.addAppointment = function (appointment: mongoose.Types.ObjectId) {
  const updatedAppointments = [...this.schedule.appointments];
  updatedAppointments.push(appointment);

  this.schedule.appointments = updatedAppointments;
  return this.save();
};

// Suppression d'un rendez-vous
scheduleSchema.methods.removeAppointment = function (schId: mongoose.Types.ObjectId) {
  const updatedAppointments = this.schedule.appointments.filter(
    (item: mongoose.Types.ObjectId) => item.toString() !== schId.toString()
  );
  
  this.schedule.appointments = updatedAppointments;
  return this.save();
};

// Export du modèle Schedule
const Schedule = mongoose.model<ISchedule>("Schedule", scheduleSchema);
export default Schedule;
