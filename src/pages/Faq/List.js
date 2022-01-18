import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import $ from "jquery";
import Accordion from "../../components/Accordion";
import * as CommonEvt from "../../CommonEvt";

const FaqList=()=>{
  const [faqData, setFaqData] = useState([]);
  const [param, setPram] = useState({
    type:"",
    expYn:"Y"
  })

  useEffect(()=>{
    getData();
    CommonEvt.headerStyle();    
  },[]);

	const getData=()=>{
		CommonEvt.api.get("/httpApi/support/faq/list", {
      params:{
        type:param.type,
        expYn:param.expYn
      }
		}).then((res) => {
      const dataSet = res.data.data.list;
      const noData = {data:null};
      if(dataSet === null){
        setFaqData(noData);
      }else{
        setFaqData(dataSet);
      }
		}).catch((err) => {
			console.log(err);
		})
	}
  
  const deleteEvt=(e)=>{
		let id = e.target.value;

		if(!window.confirm("정말 삭제하시겠습니까?")){
			return;
		}	

		CommonEvt.api.delete("/httpApi/support/faq", {
			data:{
				id:id
			}
		}).then((res)=>{
      getData();
		}).catch((error)=>{
			console.log(error.response.data);
		})
	}

  const clickTab=(e)=>{
    const target = e.target;
    let tabVal = target.value;

    $(target).siblings().removeClass("active");
    $(target).addClass("active");
    
    if(tabVal === "all") {
      tabVal = "";
    }
    param.type = tabVal;
    getData();
  }

  const searchEvt=(search)=>{
    const searchTxt = search;

    console.log(searchTxt);
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
              <div className="tab-btn">
                <button type="button" value="all" onClick={(e)=>clickTab(e)} className="active">전체</button>
                <button type="button" value="SVA" onClick={(e)=>clickTab(e)}>서비스</button>
                <button type="button" value="ETC" onClick={(e)=>clickTab(e)}>기타</button>
              </div>
            </div>
            <div className="right-div">
              <Link to="/faq/save" className="blue-btn sm">글쓰기</Link>
            </div>
          </div>
          <Accordion data={faqData} deleteEvt={deleteEvt}/>
        </div>
      </div>
    </div>
  )
};

export default FaqList;