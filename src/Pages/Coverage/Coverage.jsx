import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.8103, 90.4125];
  const mapRef = useRef(null);

  const serviceCenters = useLoaderData();
  //   console.log(serviceCenters);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.trim();
    if (!location) return;

    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coord = [district.latitude, district.longitude];
      //   console.log(coord);
      mapRef.current.flyTo(coord, 15);
    }
  };
  return (
    <div>
      <h1>Coverage</h1>

      {/* search box */}
      <div>
        <form onSubmit={handleSearch}>
          <label className="input">
            <input
              type="search"
              required
              placeholder="Search"
              name="location"
            />
          </label>
        </form>
      </div>

      {/* map Container */}
      <div className="w-full h-[600px] border-2 overflow-hidden mt-20">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[600px]"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong> <br />{" "}
                {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
