import axios from "axios";
import React, { useEffect, useState } from "react";
import { NaverMap, Marker } from "react-naver-maps";

export const NaverAPIMap = (props) => {
  const gps = props.data;

  console.log(gps);

  return (
    <NaverMap
      mapDivId={"react-naver-map"} 
      style={{
        width: "100%", 
        height: "100%"
      }}
      defaultCenter={{ lat: gps.lat, lng: gps.lng }}
      defaultZoom={15}
    >
      <Marker position={{ lat: gps.lat, lng: gps.lng }} />
    </NaverMap>
  );
};

export default NaverAPIMap;