import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import blue from "../assets/blue.png";
import red from "../assets/red.png";
import green from "../assets/green.png";
const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 45.4215, // Ottawa's latitude
  lng: -75.6972, // Ottawa's longitude
};

const MapPage = () => {
  const [shelters, setShelters] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(12);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAU0Tmj57FrER1oPYdzRELSY56BGY1lHTY",
  });

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const handleMarkerClick = useCallback(function callback(marker) {
    setZoom(16);
    if (map) {
      map.panTo(marker.position);
    }
    setSelectedMarkerId(marker.id);
    
    if (marker.shelter) {
      console.log(`Shelter details:`, marker.shelter);
    }
  }, [map]);

  const resetZoom = useCallback(function callback() {
    setZoom(12);
    if (map) {
      map.panTo(center);
    }
    setSelectedMarkerId(null);
  }, [map]);

  const fetchShelterData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/shelter/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      if (data && data.length > 0) {
        setShelters(data);
      } else {
        setShelters([]);
      }
    } catch (error) {
      console.error(error);
      setStatus(`Error fetching data: ${error.message}`);
      setShelters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShelterData();
  }, []);

  useEffect(() => {
    if (isLoaded && window.google && shelters.length > 0) {
      const markersFromShelters = shelters.map(shelter => {
        console.log(`Creating marker for shelter: ${shelter.name}, People: ${shelter.people}`);
        return {
          id: shelter.id,
          position: { 
            lat: Number(shelter.latitude), 
            lng: Number(shelter.longitude) 
          },
          shelter: shelter
        };
      });
      setMarkers(markersFromShelters);
    } else if (isLoaded && window.google && shelters.length === 0) {
      // Fallback to static marker if no shelters are found
      setMarkers([
        {
          id: "static-marker",
          position: { lat: 45.431530964032504, lng: -75.68869989086714 },
        }
      ]);
    }
  }, [isLoaded, shelters]);

  const renderMap = () => {
    return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={resetZoom}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            onLoad={() => {
              // Debug marker rendering
              let markerColor = selectedMarkerId === marker.id 
                ? "green (selected)" 
                : (marker.shelter && marker.shelter.people === 100) ? "red (full)" : "blue (available)";
              console.log(`Rendering marker ${marker.id} as ${markerColor}`);
              if (marker.shelter) {
                console.log(`Shelter: ${marker.shelter.name}, Occupancy: ${marker.shelter.people}`);
              }
            }}
            icon={{
              // Determine marker color based on selection state and shelter properties
              // - Selected markers are always green for emphasis
              // - Shelters at full capacity (100 people) are red
              // - For other unselected markers, we use blue as the default
              url: selectedMarkerId === marker.id 
                ? green 
                : (marker.shelter && marker.shelter.people === 100) ? red : blue,
              scaledSize: new window.google.maps.Size(selectedMarkerId === marker.id ? 50 : 40, selectedMarkerId === marker.id ? 50 : 40),
              // Add a slight animation effect for selected marker
              animation: selectedMarkerId === marker.id ? window.google.maps.Animation.BOUNCE : null
            }}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}

      </GoogleMap>
    );
  };

  if (loadError) {
    return <div className="map-error">Error loading maps. Please try again later.</div>;
  }

  return isLoaded ? renderMap() : <div className="map-loading">Loading Maps...</div>;
};

export default MapPage;

