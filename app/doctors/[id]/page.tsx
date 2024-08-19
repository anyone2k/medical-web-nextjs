'use client'

import React from 'react';
import { useParams } from 'next/navigation';



const DoctorPage = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>Doctor Page {id}</h1>
        </div>
    );
}

export default DoctorPage