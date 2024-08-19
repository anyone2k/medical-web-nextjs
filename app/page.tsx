"use client";

import "./Home.module.css";

import { motion } from "framer-motion";
import NavLink from "@/components/ui/Navlink";

export default function Home() {
  return (
    <div className="flex flex-col items-center ">
      <div className="w-full h-[700px] flex justify-center items-center bg-[#28574E]">
        <div className="flex flex-col -mt-[400px] gap-x-4">
          <motion.div
            className="p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center">
              World's Best Advanced
              <br />
              Care Platform
            </h1>
          </motion.div>
          <motion.div
            className="p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-white text-18px sm:text-18px md:text-18px text-center">
              Find The Best Hospitals and Doctors Across your area
            </p>
            <div className="p-4 flex justify-center">
              <NavLink
                href="/doctors"
                className="flex items-center justify-center gap-x-1 text-sm  font-medium text-[#28574E] bg-[#FFFFFF] hover:bg-[#1E232F]  hover:text-white active:bg-[#1E232F] md:inline-flex"
              >
                Find Doctors
              </NavLink>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="w-full h-48 flex-grow bg-[#FFFFFF]"></div>
      <div className="w-full h-48 bg-[#1E232F]"></div>
      <div className="w-full h-48 bg-[#FFFFFF]"></div>
      <div className="w-full h-48 bg-[#28574E]"></div>
    </div>
  );
}
