"use client";

import React, { useState, useEffect, useCallback } from "react";
import { MapProvider } from "@/providers/map-provider";
import dynamic from "next/dynamic";
import axios from "axios";
import { Doctor } from "@/models/Doctor";
import ListItem from "@/components/ui/ListItem";
import SearchBar from "@/components/Searchbar";
import { AnimatePresence, motion } from "framer-motion";
import AppointmentForm from "@/app/appointments/page"; // Import du formulaire depuis le dossier `app`

const Maps = dynamic(() => import("@/components/Map"), { ssr: false });

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState<Doctor | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState<boolean>(false); // État pour afficher le formulaire

  const fetchDoctors = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:10999/api/v1/doctors");
      setDoctors(response.data.data);
    } catch (error) {
      console.error("Error fetching doctors", error);
    }
  }, []);

  useEffect(() => {
    if (query === "") {
      fetchDoctors();
    }
  }, [query, fetchDoctors]);

  const fetchDoctorsByQuery = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:10999/api/v1/doctors/search/query?search=${query}`
      );
      setDoctors(response.data.data);
    } catch (error) {
      console.error("Error fetching doctors by query", error);
    }
  }, [query]);

  useEffect(() => {
    if (query !== "") {
      const debounceTimeout = setTimeout(() => {
        fetchDoctorsByQuery();
      }, 500);

      return () => clearTimeout(debounceTimeout);
    }
  }, [query, fetchDoctorsByQuery]);

  const handleSelect = (option: Doctor, index: number) => {
    setSelectedOption(option);
    setSelectedId(index);
  };

  const handleAppointmentClick = () => {
    setShowAppointmentForm(true); // Affiche le formulaire de rendez-vous
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      <div className="md:col-span-1 lg:col-span-1 bg-palette-green flex flex-col h-[90.5vh]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-10 flex-grow overflow-hidden"
        >
          <SearchBar
            setQuery={setQuery}
            query={query}
            placeholder="Rechercher des médecins..."
          />
          <ul className="mt-2 bg-palette-green rounded-md max-h-screen overflow-y-auto no-scrollbar">
            {doctors.map((doctor, index) => (
              <ListItem
                key={index}
                doctor={doctor}
                handleSelect={() => handleSelect(doctor, index)}
                index={index}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden md:col-span-2 lg:col-span-3 bg-gray-200 flex-col h-[90.5vh] sm:flex"
      >
        <MapProvider>
          <Maps />
        </MapProvider>
      </motion.div>

      <AnimatePresence>
        {selectedId !== null && !showAppointmentForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            layoutId={selectedId}
            className="p-6 inset-0 fixed flex items-center justify-center z-50 bg-black rounded-lg shadow-lg bg-opacity-30"
          >
            <div className="bg-white p-6 flex-col flex items-center justify-center rounded-lg shadow-lg">
              <img
                src={doctors[selectedId].profilePicture}
                alt={`Dr. ${doctors[selectedId].fullName.firstName} ${doctors[selectedId].fullName.lastName}`}
                className="w-50 h-50 mt-3"
              />
              <h2>
                Dr. {doctors[selectedId].fullName.firstName}{" "}
                {doctors[selectedId].fullName.lastName}
              </h2>
              <p>{doctors[selectedId].specialisation.field}</p>
              <p>{doctors[selectedId].specialisation.name}</p>
              <p>{doctors[selectedId].email}</p>
              <motion.button
                onClick={handleAppointmentClick} // Affiche le formulaire de rendez-vous
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Prendre rendez-vous
              </motion.button>
              <motion.button
                onClick={() => setSelectedId(null)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Fermer
              </motion.button>
            </div>
          </motion.div>
        )}

        {showAppointmentForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-6 inset-0 fixed flex items-center justify-center z-50 bg-black rounded-lg shadow-lg bg-opacity-30"
          >
            <div className="bg-white p-6 flex-col flex items-center justify-center rounded-lg shadow-lg w-full max-w-md">
              <AppointmentForm /> {/* Formulaire importé depuis `app` */}
              <motion.button
                onClick={() => setShowAppointmentForm(false)} // Ferme le formulaire de rendez-vous
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Fermer
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoctorsPage;
