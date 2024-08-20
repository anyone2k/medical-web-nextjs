"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Doctor {
  _id: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
}

const AppointmentForm = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [duration, setDuration] = useState<number>(30);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:10999/api/v1/doctors');
        console.log('Response from API:', response.data); // Debugger la réponse de l'API
        // Si la structure de l'API est correcte
        if (Array.isArray(response.data.data)) {
          setDoctors(response.data.data);  // Assignez les données au state
        } else {
          console.error('Data format is not an array');
        }
      } catch (error) {
        console.error("Error fetching doctors", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:10999/api/v1/appointements', {
        patientId: '66c2b08ff5456a18f366b02f',
        doctorId: selectedDoctor,
        dayTime: date,
        duration,
        reason,
      });

      setMessage('Rendez-vous créé avec succès !');
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Une erreur s\'est produite.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Prendre un Rendez-vous</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
            Docteur
          </label>
          <select
            id="doctor"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Sélectionnez un docteur</option>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.fullName.firstName} {doctor.fullName.lastName}
                </option>
              ))
            ) : (
              <option disabled>Aucun docteur disponible</option>
            )}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date et Heure
          </label>
          <input
            type="datetime-local"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Durée (en minutes)
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            required
            min={15}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
            Raison
          </label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
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

        {message && <p className="text-red-600 mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default AppointmentForm;
