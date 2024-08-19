'use client';

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router"; // Import du hook useRouter pour la redirection

const SchedulePage = () => {
  const [formData, setFormData] = useState({
    doctorName: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  const [error, setError] = useState("");
  const router = useRouter(); // Utilisation du hook useRouter pour la redirection

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Appel à l'API pour enregistrer le nouveau rendez-vous
      const response = await axios.post("/api/appointment", formData);

      // Si la soumission réussit, redirige vers la page de gestion des rendez-vous
      router.push("/schedule");
    } catch (error) {
      setError("Erreur lors de la prise du rendez-vous.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Prendre un Nouveau Rendez-vous</h2>
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
          Prendre Rendez-vous
        </button>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default SchedulePage;
