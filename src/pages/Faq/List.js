import React, { useEffect, useState } from "react";
import {Link, useLocation} from 'react-router-dom';
import axios from "axios";
import Accordion from "../../components/Accordion";
import * as CommonEvt from "../../CommonEvt";

const FaqList=()=>{
  const [faqData, setFaqData] = useState([]);

  useEffect(()=>{
    getData();
    CommonEvt.headerStyle();    
  },[]);

	const getData=()=>{
		var url = "/support/faq/list";

		axios.get("/httpApi" + url, {
			headers:{
        "X-CLIENT-KEY":"YSFyQHQjbSRvJWElcHJvamVjdCFA",
			}
		}).then((res) => {
      const dataSet = res.data.data.list;
      setFaqData(dataSet);
		}).catch((err) => {
			console.log(err);
		})
	}
  
  const deleteEvt=(e)=>{
		let id = e.target.value;

		if(!window.confirm("정말 삭제하시겠습니까?")){
			return;
		}	

		let url = "/support/faq";
		axios.delete("/httpApi" + url, {
			headers:{
				"X-CLIENT-KEY":"YSFyQHQjbSRvJWElcHJvamVjdCFA"
			},
			data:{
				id:id
			}
		}).then((res)=>{
      getData();
		}).catch((error)=>{
			console.log(error.response.data);
		})
	}

  return(
    <div id="cBody">
      <div className="sub-vis">
        <div className="bg bg3"></div>
        <h2 className="sub-title">FAQ</h2>
      </div>
      <div className="faq-div inner">
        <div className="title-div">
          <p className="txt">artMoa 관련 자주 하는 질문을 한곳에 모았습니다.<br/> 아래 질문을 클릭하시면 답변을 확인할 수 있습니다.</p>
        </div>
        <div className="list-div">
          <div className="list-top">
            <div className="left-div">
              <p className="total">총 <span>{faqData.length}</span>개</p>
            </div>
            <div className="right-div">
              <Link to="/faq/save" className="blue-btn sm">글쓰기</Link>
            </div>
          </div>
          <Accordion data={faqData} deleteEvt={deleteEvt}/>
          <div className="btn-wrap">
            <button type="button" className="blue-btn">More</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default FaqList;