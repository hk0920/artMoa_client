import React, { useEffect, useState } from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import $ from "jquery";
import * as CommonEvt from "../../CommonEvt";
import "./faq.scss";
import { useLocation } from "react-router-dom";

const FaqWrite=({type})=>{
  const [body, setBody] = useState({
    id:"",
    type:"",
    title:"",
    content:"",
    delYn:"",
    expYn:"",
    register:""
  });
  const [faqTitle, setFaqTitle] = useState();
  const location = useLocation();

  const getData=()=>{
    if(location.pathname === "/faq/save"){
      setFaqTitle("FAQ 등록");
      setBody({
        type:"SVA",
        delYn:"Y"
      })
    }else if(location.pathname === "/faq/update"){
      let faqId = location.state.idx;
      setFaqTitle("FAQ 수정");

      let url = "/support/faq/detail";
      axios.get("/httpApi" + url, {
        headers:{
          "X-CLIENT-KEY":"YSFyQHQjbSRvJWElcHJvamVjdCFA"
        },
        params:{
          id:faqId
        }
      }).then((res)=>{
        const data = res.data.data.info;
        setBody({
          id:faqId,
          type:data.type,
          title:data.title,
          content:data.content
        })
      }).catch((error)=>{
        console.log(error);
      })
    }
  }

  useEffect(()=>{
    getData();
  },[])

  const onSubmit=(e)=>{
    for(var i=0; i<e.target.type.length; i++){
      if(e.target.type[i].checked){
        body.type = e.target.type[i].id;
      }
    }
    for(var i=0; i<e.target.expYn.length; i++){
      if(e.target.expYn[i].checked){
        body.expYn = e.target.expYn[i].id;
      }
    }
    body.title = e.target.title.value;
    body.content = e.target.content.value;

    if(type === "save"){
      let url = "/support/faq/save";
      axios.post("/httpApi" + url, body, {
        headers:{
          "X-CLIENT-KEY":"YSFyQHQjbSRvJWElcHJvamVjdCFA"
        }
      }).then((res)=>{
        console.log(res);
      }).catch((error)=>{
        console.log(error);
      })
    }else if(type === "update"){
      console.log("수정");
      console.log(body);

      let url = "/support/faq";
      axios.put("/httpApi" + url, body, {
        headers:{
          "X-CLIENT-KEY":"YSFyQHQjbSRvJWElcHJvamVjdCFA"
        }
      }).then((res)=>{
        console.log(res);
      }).catch((error)=>{
        console.log(error.response.data);
      })
    }
  }

  const chkType=(e)=>{
    const target = e.target;

    if(target.name === "type"){
      setBody({
        type:target.id,
        title:body.title,
        content:body.content,
        delYn:body.delYn
      })
    }
    if(target.name === "expYn"){
      setBody({
        type:body.type,
        title:body.title,
        content:body.content,
        delYn:target.id
      })
    }
    console.log(body);
  }

  useEffect(()=>{
    CommonEvt.headerStyle();
  },[])

  return(
    <div id="cBody">
      <div className="sub-vis">
        <div className="bg bg3"></div>
        <h2 className="sub-title">FAQ</h2>
      </div>
      <div className="faq-div inner">
        <div className="write-form">
          <p className="content-tit">{faqTitle}</p>
          <form method="post" name="join" onSubmit={function(e){e.preventDefault(); onSubmit(e)}}>
            <div className="form-div">
              <dl className="form-dl">
                <dt>
                  구분 <span className="required">*</span>
                </dt>
                <dd>
                  <div className="radio-txt">
                    <input type="radio" name="type" id="SVA" checked={body.type==="SVA"} onChange={chkType} />
                    <label htmlFor="SVA">서비스 이용</label>
                  </div>
                  <div className="radio-txt">
                    <input type="radio" name="type" id="ETC" checked={body.type==="ETC"} onChange={chkType} />
                    <label htmlFor="ETC">기타</label>
                  </div>
                </dd>
              </dl>
              <dl className="form-dl">
                <dt>
                  노출여부 <span className="required">*</span>
                </dt>
                <dd>
                  <div className="radio-txt">
                    <input type="radio" name="expYn" id="Y" checked={body.delYn==="Y"?true:false} onChange={chkType} />
                    <label htmlFor="Y">노출</label>
                  </div>
                  <div className="radio-txt">
                    <input type="radio" name="expYn" id="N" checked={body.delYn==="N"?true:false} onChange={chkType}/>
                    <label htmlFor="N">미노출</label>
                  </div>
                </dd>
              </dl>
              <dl className="form-dl">
                <dt>
                  질문 <span className="required">*</span>
                </dt>
                <dd>
                  <input type="text" placeholder="질문을 입력해주세요." name="title" defaultValue={body.title}/>
                </dd>
              </dl>
              <dl className="form-dl">
                <dt>
                  내용 <span className="required">*</span>
                </dt>
                <dd>
                  <textarea placeholder="내용을 입력해주세요." name="content" defaultValue={body.content} />
                </dd>
              </dl>
            </div>
            <div className="btn-wrap">
              <button type="submit" className="blue-btn">저장</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default FaqWrite;