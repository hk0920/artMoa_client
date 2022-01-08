import React, { useEffect, useState } from "react";
import "swiper/css/bundle";
import axios from "axios";
import XMLparser from "react-xml-parser";
import MainVis from "./MainVis";
import CardList from "../../components/CardList";
import TextList from "../../components/TextList";
import * as CommonEvt from "../../CommonEvt";
import "./main.scss";

const Main=()=>{
  const [artData, setArtData] = useState([]);
  const [noticeData, setNoticeData] = useState([]);
  const dataList = [];

  useEffect(()=>{
    //getArtList();
    //getNoticeList();
    CommonEvt.headerStyle();
  },[]);

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

  const getArtList=()=>{
    var url = '/openapi/rest/publicperformancedisplays/period'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'OApFbw%2FzxEwtqHKqUyc8QWvBESqtoamTLFLeS7zF7RTUAy1MykuCnHPhQzRBtz8vU76BEmXb2aYcPLMmW7KQkw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('cPage') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('rows') + '=' + encodeURIComponent('12'); /**/

    axios.get('/api' + url + queryParams).then(res=>{
      const dataSet = res.data;
      parseStr(dataSet);
      setArtData(dataList);
    }).catch(error=>{
      console.log("에러" + error);
    });
  }

  const getNoticeList=()=>{
    var url = "http://api.kcisa.kr/openapi/service/rest/meta2020/getKOCAnotice?serviceKey=7d58e468-50c5-4c98-89be-819d8fdcff3f";

    axios.get(url,{
      params:{
        numOfRows:8,
        pageNo:1
      }
    }).then(res=>{
      setNoticeData(res.data.response.body.items.item);
    }).catch(error=>{
      console.log(error);
    })
  }

  return(
    <div id="cBody" className="main">
      <MainVis />
      <section className="main-sec list-sec">
        <div className="inner">
          <CardList data={artData} />
        </div>
      </section>
      <section className="main-sec notice-sec">
        <div className="inner">
          <div className="title-div">
            <p className="sec-title">Notice</p>
          </div>
          <div className="list-div">
            <TextList data={noticeData}/>
            <div className="btn-wrap">
              <button type="button" className="txt-more-btn">More</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
};

export default Main;