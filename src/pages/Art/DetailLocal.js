import axios from "axios";
import React, { useEffect, useState } from "react";
import { RenderAfterNavermapsLoaded } from "react-naver-maps";
import NaverApiMap from "./NaverAPIMap";

const DetailLocal=(props)=>{
	const data = props.data;
	const [gps, setGps] = useState({
		lat:"",
		lng:"",
		place:"",
		addr:""
	});
	
	data.map((item)=>{
		if(item.name === "place"){
			gps.place = item.value;
		}
	});
	
  const getData=async()=>{
		if(gps.place !== "") {
			let url = "/naverSrchApi/v1/search/local.json";
			var queryParams = '?' + "query=" + gps.place;
			queryParams += "&display=10&start=1&sort=random";
		
			axios.get(url + queryParams, {
				headers:{
					"X-Naver-Client-Id":"ob_oSAjFxLeUPq0dZHdj",
					"X-Naver-Client-Secret":"wrZ_g1EJE6"
				}
			}).then(res=>{
				if(gps.addr === ""){
					setGps({
						lat:gps.lat,
						lng:gps.lng,
						place:gps.place,
						addr:res.data.items[0].address
					});
				}
			}).catch(error=>{
				console.log(error.response);
			});
		}
	}

  const navermaps = window.naver.maps;

  const searchAddressToCoordinate=(address)=>{
		if(address !== ""){
			navermaps.Service.geocode(
				{
					query: address,
				},
				function (status, response) {
					if (status === navermaps.Service.Status.ERROR) {
						if (!address) {
							return alert('Geocode Error, Please check address');
						}
						return alert('Geocode Error, address:' + address);
					}
	
					if (response.v2.meta.totalCount === 0) {
						return alert('No result.');
					}
	
					let item = response.v2.addresses[0];
					if(gps.lat === ""){
						setGps({
							lat:item.y,
							lng:item.x,
							place:gps.place,
							addr:gps.addr
						});
					}
				},
			);
		}
  }

	useEffect(()=>{
		getData();
		searchAddressToCoordinate(gps.addr);
	});

	return(
		<>
			<div className="local-map">
				{
					gps.addr !== ""?
						<>
							<p className="map-addr">{gps.addr}</p>
							<div className="map-div">
								<RenderAfterNavermapsLoaded
									ncpClientId={"h1b9ymo6a5"}
									error={<p>Maps Load Error</p>}
									loading={<p>Maps Loading...</p>}
									submodules={["geocoder"]}
								>
									<NaverApiMap data={gps} />
								</RenderAfterNavermapsLoaded>
							</div>
						</>
					:
						<div className="no-data">
							<p className="txt">지도에서 장소를 찾을 수 없습니다.</p>
						</div>
				}
			</div>
		</>
	)
}

export default DetailLocal;