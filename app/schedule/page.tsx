'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Appointment {
  doctor: string; // Référence à l'ID du médecin
  appointments: {
    doctorName: string;
    appointmentDate: string;
    appointmentTime: string;
    reason: string;
  }[];
}

const SchedulePage = () => {
  const [formData, setFormData] = useState({
    doctorName: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  const [result, setResult] = useState<Appointment | null>(null); // Typage explicite
  const [error, setError] = useState("");

  useEffect(() => {
    if (result) {
      // Remplir le formulaire avec les données de `result`
      const appointment = result.appointments[0]; // Supposons que tu veuilles prendre le premier rendez-vous
      setFormData({
        doctorName: appointment.doctorName,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: appointment.appointmentTime,
        reason: appointment.reason,
      });
    }
  }, [result]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.get("/api/appointment", {
        params: {
          appointmentDate: formData.appointmentDate,
          appointmentTime: formData.appointmentTime,
          reason: formData.reason,
        },
      });

      setResult(response.data);
    } catch (error) {
      setError("Erreur lors de la recherche du rendez-vous.");
      setResult(null);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Rechercher un Rendez-vous</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">
            Appointment Date
          </label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700">
            Appointment Time
          </label>
          <input
            type="time"
            id="appointmentTime"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700">
            Doctor's Name
          </label>
          <input
            type="text"
            id="doctorName"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
            Reason for Appointment
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Search
        </button>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Rendez-vous trouvé :</h3>
          {result.appointments.map((appointment, index) => (
            <div key={index}>
              <p>Médecin : {appointment.doctorName}</p>
              <p>Date : {appointment.appointmentDate}</p>
              <p>Heure : {appointment.appointmentTime}</p>
              <p>Raison : {appointment.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SchedulePage;
