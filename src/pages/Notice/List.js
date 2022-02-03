import React, { useEffect, useState } from "react";
import TextList from "../../components/TextList";
import * as CommonEvt from "../../CommonEvt";
import TotalSearch from "../../components/TotalSearch";
import { Link } from "react-router-dom";

const NoticeList=()=>{
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);
	const [moreDataCnt, setMoreDataCnt] = useState(0);
  const dataSize = 8;
  
  useEffect(()=>{
    getData();
  },[])

  const getData=()=>{
    CommonEvt.api.get("/httpApi/support/notice/list", {
      params:{
        page:moreDataCnt,
        size:dataSize
      }
    }).then((res)=>{ 
      const dataSet = res.data.data.list;
      setTotal(res.data.data.total);
      if(dataSet !== null){
        setData(data.concat(dataSet));
        setMoreDataCnt(moreDataCnt + dataSize);
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  const searchEvt=(srchTxt)=>{
    console.log(srchTxt);
    CommonEvt.api.get("/httpApi/support/notice/list", {
      params:{
        page:0,
        size:dataSize,
        title:srchTxt
      }
    }).then((res)=>{ 
      const dataSet = res.data.data.list;
      console.log(dataSet);
      setData(dataSet);
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div id="cBody">
      <div className="sub-vis">
        <div className="bg bg4"></div>
        <h2 className="sub-title">Notice</h2>
      </div>
      <div className="notice-div inner">
        <div className="list-div">
          <TotalSearch searchEvt={searchEvt} />
          <div className="list-top">
            <div className="left-div">
              <p className="total">총 <span>{data!==null?total:0}</span>개</p>
            </div>
            <div className="right-div">
              <Link to="/notice/save" className="blue-btn sm">글쓰기</Link>
            </div>
          </div>

          <TextList data={data} />
          
          {
            data!==null?  
              <div className="btn-wrap">
                <button type="button" className="blue-btn" onClick={getData}>More</button>
              </div>
            :""
          }
        </div>
      </div>
    </div>
  )
};

export default NoticeList;