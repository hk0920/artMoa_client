import React from "react";
import { RenderAfterNavermapsLoaded, NaverMap } from "react-naver-maps";

export const NaverAPIMap = (props) => {
  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={"h1b9ymo6a5"}
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMap
        mapDivId={"react-naver-map"} 
        style={{
          width: "100%", 
          height: "100%"
        }}
        defaultCenter={{ lat: 37.554722, lng: 126.970833 }} 
        zoom={props.zoom}
      >
      </NaverMap>
    </RenderAfterNavermapsLoaded>
  );
};

export default NaverAPIMap;