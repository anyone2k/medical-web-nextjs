"use client";
import SearchBar from "@/components/Searchbar";
import ListItem from "@/components/ui/ListItem";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
const AppointmentsPage = () => {
  const { data: session } = useSession();
  useEffect(() => {
    // redirect to home if user is not authenticated
    if (!session) {
      window.location.href = "/";
    }
  });
  return (
    <div className="flex items-center justify-center">
      <div className="md:col-span-1 lg:col-span-1 bg-palette-green flex flex-col h-[90.5vh] max-h-dvh">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-10 flex-grow overflow-hidden "
        >
          <div className="text-white">
            <p>Current date and time: {new Date().toLocaleString()}</p>
          </div>
          <ul className="mt-2 bg-palette-green rounded-md max-h-screen overflow-y-auto no-scrollbar">
            {/* {doctors.map((doctor, index) => (
                  <ListItem
                    key={index}
                    doctor={doctor}
                    handleSelect={() => handleSelect(doctor, index)}
                    index={index}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                  />
                ))} */}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
