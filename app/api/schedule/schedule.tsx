// pages/api/appointment.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Schedule } from "@/models/Schedule";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { doctorName, appointmentDate, appointmentTime, reason } = req.body;
      // const newAppointment = new SchedulePage({
      //   doctorName,
      //   appointmentDate,
      //   appointmentTime,
      //   reason,
      // });

      // await newAppointment.save();
      res.status(201).json({ message: "Rendez-vous créé avec succès." });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erreur lors de la création du rendez-vous.", error });
    }
  } else {
    res.status(405).json({ message: "Méthode non autorisée." });
  }
}
