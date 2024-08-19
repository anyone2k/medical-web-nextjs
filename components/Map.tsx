"use client";

import { GoogleMap, Marker } from "@react-google-maps/api";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Address } from "@/models/Address";
import { geocode } from "@/utils/geocode";

const defaultMapZoom = 13;
const defaultMapContainerStyle = {
  width: "100%",
  height: "100vh",
};
const defaultMapOptions = {
  zoomControl: true,
  disableDefaultUI: true,
  gestureHandling: "auto",
  mapTypeId: "roadmap",
  streetViewControl: false,
  mapTypeControl: false,
};
const defaultMapCenter = {
  lat: 45.5017,
  lng: -73.5673,
};

const Maps = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [mapCenter, setMapCenter] = useState(defaultMapCenter); // Dynamic map center
  const mapRef = useRef<google.maps.Map | null>(null); // Ref to the map instance

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:10999/api/v1/hospitals/addresses/get"
        );
        const results = response.data["data"];

        const geocodedAddresses: Address[] = await Promise.all(
          results.map(async (address: { name: any; address: any }) => {
            const fullAddress = `${address.address.street}, ${address.address.city}, ${address.address.state}, ${address.address.country}`;
            const location = await geocode(fullAddress);

            if (location !== null) {
              return {
                name: address.name,
                address: location,
              };
            }

            return null; // Filter out invalid addresses
          })
        );

        const validAddresses = geocodedAddresses.filter(
          (address) => address !== null
        ) as Address[];

        setAddresses(validAddresses);

        // Set the center of the map to the first valid address if available
        if (validAddresses.length > 0) {
          setMapCenter({
            lat: validAddresses[1].address.lat,
            lng: validAddresses[1].address.lng,
          });

          // If the map instance exists, manually pan to the new center
          if (mapRef.current) {
            mapRef.current.panTo({
              lat: validAddresses[1].address.lat,
              lng: validAddresses[1].address.lng,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching addresses", error);
      }
    };

    fetchAddresses();
  }, []);

  return (
    <>
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={mapCenter} // Set dynamic center
        zoom={defaultMapZoom}
        options={defaultMapOptions}
        onLoad={(map) => {
          mapRef.current = map; // Assign map to the ref
        }}
      >
        {/* Render markers for each address */}
        {addresses.map((location, index) => (
          <Marker
            key={index}
            position={{ lat: location.address.lat, lng: location.address.lng }}
            title={location.name}
          />
        ))}
      </GoogleMap>
    </>
  );
};

export default Maps;
