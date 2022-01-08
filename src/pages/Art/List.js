import React, { useEffect, useState } from "react";
import axios from 'axios';
import XMLparser from "react-xml-parser";
import CardList from "../../components/CardList";
import * as CommonEvt from "../../CommonEvt";

const ArtList=()=> {
  const [artData, setArtData] = useState([]); 
  let dataList = [];

  useEffect(()=>{
    // list();
    CommonEvt.headerStyle();
  },[])

  const parseStr=(dataSet)=>{
    const dataArr = new XMLparser().parseFromString(dataSet).children;
    // eslint-disable-next-line no-lone-blocks
    {
      dataArr.map((item)=>{
        if(item.name==="msgBody"){
          item.children.map((data)=>{
            if(data.name === "perforList"){
              dataList.push(data);
            }
          })
        }
      })
    }
  }
  
  const list=()=>{
    let url="/openapi/rest/publicperformancedisplays/period";
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'OApFbw%2FzxEwtqHKqUyc8QWvBESqtoamTLFLeS7zF7RTUAy1MykuCnHPhQzRBtz8vU76BEmXb2aYcPLMmW7KQkw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('cPage') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('rows') + '=' + encodeURIComponent('12'); /**/

    axios.get("/api" + url + queryParams).then(res=>{
      const dataSet = res.data;
      console.log(res);
      //parseStr(dataSet);
      setArtData(dataList);
      //console.log(artData)
    }).catch(error=>{
      console.log("에러" + error);
    });
  }

  return(
    <div id="cBody">
      <div className="sub-vis">
        <div className="bg bg1"></div>
        <h2 className="sub-title">Exhibition</h2>
      </div>
      <div className="art-div">
        <div className="inner">
          <CardList data={artData} />
        </div>
      </div>
    </div>
  )
};

export default ArtList;