import axios from "axios";
import React, { useEffect, useState } from "react";
import TextList from "../../components/TextList";

const NoticeList=()=>{
  const [data, setData] = useState([]);
	const [moreDataCnt, setMoreDataCnt] = useState(1);
  const dataSize = 8;
  
  useEffect(()=>{
    getData();
  },[])

  const getData=()=>{
    let url = "http://api.kcisa.kr/openapi/service/rest/meta2020/getKOCAnotice?serviceKey=7d58e468-50c5-4c98-89be-819d8fdcff3f";
    
    axios.get(url,{
      params:{
        numOfRows:dataSize,
        pageNo:moreDataCnt
      }
    }).then(res=>{
      const dataSet = res.data.response.body.items.item;
      setData(data.concat(dataSet));
			setMoreDataCnt(moreDataCnt + parseInt(dataSize));
    }).catch(error=>{
      console.log("에러" + error);
    })
  }

  return (
    <div id="cBody">
      <div className="sub-vis">
        <div className="bg bg4"></div>
        <h2 className="sub-title">Notice</h2>
      </div>
      <div className="notice-div">
        <div className="inner">
          <div className="list-div">
            <TextList data={data} />
            <div className="btn-wrap">
              <button type="button" className="blue-btn" onClick={getData}>More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default NoticeList;