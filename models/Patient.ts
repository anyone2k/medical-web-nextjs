const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema(
  {
    name:{
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    dateOfBirth: {
      type: Date,
      trim: true,
      default: null,
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      default: null,
    },
    phone_number: {
      type: String,
      default: "",
    },
    medicalfile: [
      {
        type: Schema.Types.ObjectId,
        ref: "MedicalFile",
        default: null,
      },
    ],
    emergency_contact: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "no-photo.jpg",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);


// Check if the model already exists before defining it
const Patient =
  mongoose.models.Patient || mongoose.model("Patient", PatientSchema);

// Ensure the unique index is created
PatientSchema.on("index", ({ error }: { error: any }) => {
  if (error) {
    console.error("An error occurred while creating the index:", error);
  }
});


export default Patient;
