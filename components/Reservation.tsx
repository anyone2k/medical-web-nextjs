import React, { useState, useRef } from 'react';
import { LoadScript, GoogleMap, Autocomplete, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import axios from 'axios';
import Button from '@react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useNavigate, Link } from 'react-router-dom';
const MapComponent = () => {
    const navigate = useNavigate();

    const email = localStorage.getItem('userEmail') || ''; // Get the logged-in user's email from local storage
    const [directions, setDirections] = useState(null);
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [travelTime, setTravelTime] = useState('');
    const [cost, setCost] = useState(0);
    const [taxes, setTaxes] = useState(0);
    const departureRef = useRef(null);
    const arrivalRef = useRef(null);

    const calculateAndDisplayRoute = () => {
        if (!departure || !arrival) {
            alert("Veuillez entrer les deux lieux.");
            return;
        }

        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
            {
                origin: departure,
                destination: arrival,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                    const duration = result.routes[0].legs[0].duration;
                    setTravelTime(duration.text);
                    calculateCost(duration.value); // duration.value is in seconds
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    };

    const calculateCost = (durationInSeconds) => {
        const costPerMinute = 0.55; // Example cost per minute
        const durationInMinutes = durationInSeconds / 60;
        const totalCost = (durationInMinutes * costPerMinute) + 4;

        setCost(totalCost.toFixed(2)); // Round to 2 decimal places
        const taxes = (totalCost * 1.15);
        setTaxes(taxes.toFixed(2));
    };

    const onLoadDeparture = (autocomplete) => {
        departureRef.current = autocomplete;
    };

    const onLoadArrival = (autocomplete) => {
        arrivalRef.current = autocomplete;
    };

    const onPlaceChangedDeparture = () => {
        const place = departureRef.current.getPlace();
        setDeparture(place.formatted_address);
    };

    const onPlaceChangedArrival = () => {
        const place = arrivalRef.current.getPlace();
        setArrival(place.formatted_address);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:3010/reservations/newReservaion', {
                email
            });
            if (res.status === 201) {
                navigate('/paiement');
            }
        }
        catch (error) {
            console.error("Error:", error);

        }

    }
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBucD9pPNdiMqxKEW8Wogf-yjVCY3WFiL0"
            libraries={['places']}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1>Faites votre reservation</h1>
                <div style={{ marginBottom: '10px' }}>
                    <Autocomplete
                        onLoad={onLoadDeparture}
                        onPlaceChanged={onPlaceChangedDeparture}
                    >
                        <input
                            type="text"
                            placeholder="Entrez le lieu de départ"
                            style={{ width: "300px", height: "40px", marginBottom: "10px" }}
                        />
                    </Autocomplete>
                    <Autocomplete
                        onLoad={onLoadArrival}
                        onPlaceChanged={onPlaceChangedArrival}
                    >
                        <input
                            type="text"
                            placeholder="Entrez le lieu d'arrivée"
                            style={{ width: "300px", height: "40px", marginBottom: "10px" }}
                        />
                    </Autocomplete>
                </div>
                <button onClick={calculateAndDisplayRoute} style={{ marginBottom: '10px' }}>
                    Obtenir l'itinéraire
                </button>
                {travelTime && (
                    <div style={{ marginBottom: '10px', color: 'white', fontSize: '27px', fontWeight: 'bolder', textAlign: 'center' }}>
                        <p>Temps de trajet estimé: {travelTime}</p>
                        <p>Coût estimé: ${cost}</p>
                        <p>Taxes estimés: ${(taxes - cost).toFixed(2)}</p>
                        <p id='total'>Total: ${taxes}</p>
                        <br></br>
                        <Form id='frmSignup' onSubmit={handleSubmit}>
                            <Button type="submit" className="btn btn-primary" id='signup'>Completer le paiement</Button>
                            <br></br>

                        </Form>


                    </div>
                )}
                <div style={{ width: '100%', height: '500px' }}>
                    <GoogleMap
                        center={{ lat: 45.5017, lng: -73.5673 }}
                        zoom={10}
                        mapContainerStyle={{ height: "100%", width: "100%" }}
                    >
                        {directions && (
                            <DirectionsRenderer
                                directions={directions}
                            />
                        )}
                    </GoogleMap>
                </div>
                <br></br>
                <br></br>
            </div>
        </LoadScript>
    );
};

export default MapComponent;
