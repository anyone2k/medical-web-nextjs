export interface Schedule {
    _id: string;
    doctorId: string;
    patientId: string;
    appointmentDate: Date;
    appointmentTime: string;
    reason: string;
    status: "Pending" | "Confirmed" | "Cancelled";
    createdAt: Date;
  }
  