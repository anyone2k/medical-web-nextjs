"use client";

import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Importing a check circle icon from react-icons
import Image from "next/image";
import Link from "next/link";
import Button from "./ui/Button";
import Calendar from "@/components/calendar.png"
import logo from "@/app/icon.ico";
import success from "@/components/image.png";
const Success = () => {
    return (
        <div className="flex bg-palette-blue h-screen max-h-screen px-[5%]">
            <div className="success-img m-auto text-center">
                <Link href="/" className="flex items-center justify-center">
                    <Image
                        src={logo}
                        height={1000}
                        width={1000}
                        alt="logo"
                        className="h-10 w-10"
                    />
                    <span className="text-palette-white">MDS online</span>
                </Link>

                <section className="flex flex-col items-center mt-8 text-2xl">
                    <Image src={success} height={300} width={280} alt="success" />
                    <h1 className="header mb-6 max-w-[690px] text-center text-palette-white">
                        Your{" "}
                        <span style={{ color: '#4AC97E' }}>appointment request</span>{" "}
                        has been successfully submitted!
                    </h1>
                    <p className="text-palette-white">
                        We&apos;ll be in touch shortly to confirm.
                    </p>
                </section>

                <section className="request-details mt-6 text-palette-sucess">
                    <p>Requested appointment details: </p>
                    <div className="flex items-center gap-3 mt-2">
                        <Image
                            src=""
                            alt="doctor"
                            width={100}
                            height={100}
                            className="size-6"
                        />
                        <p className="whitespace-nowrap">Dr. </p>
                    </div>
                    <div className="flex gap-2 mt-2">
                        <Image
                            src={Calendar}
                            height={24}
                            width={24}
                            alt="calendar"
                        />
                        <p> date de rdv</p>
                    </div>
                </section>

                <Button variant="outline" className="shad-primary-btn mt-6 text-palette-white" asChild>
                    New Appointment
                </Button>

            </div>
        </div>
    );
};

export default Success;
