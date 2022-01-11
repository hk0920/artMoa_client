import React, { useEffect, useState } from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import * as CommonEvt from "../../CommonEvt";
import "./faq.scss";

const FaqWrite=()=>{
  const [type, setType] = useState();
  const [expYn, setExpYn] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  
  useEffect(()=>{
    CommonEvt.headerStyle();
  },[])

  const onSubmit=(e)=>{
    for(var i=0; i<e.target.type.length; i++){
      if(e.target.type[i].checked){
        setType(e.target.type[i].id);
      }
    }
    for(var i=0; i<e.target.expYn.length; i++){
      if(e.target.expYn[i].checked){
        setType(e.target.expYn[i].id);
      }
    }
    setTitle(e.target.title.value);
    setContent(e.target.content.value);

    let url = "/support/faq/save";
    axios.post("/httpApi" + url, {
      headers:{
        "X-CLIENT-KEY":"YSFyQHQjbSRvJWElcHJvamVjdCFA"
      },
      params:{
        "type":type,
        "title":title,
        "content":content,
        "expYn":expYn,
        "register":"test01"
      }
    }).then((res)=>{
      console.log(res);
    }).catch((error)=>{
      console.log(error);
    })
  }

  return(
    <div id="cBody">
      <div className="sub-vis">
        <div className="bg bg3"></div>
        <h2 className="sub-title">FAQ</h2>
      </div>
      <div className="faq-div inner">
        <div className="write-form">
          <p className="content-tit">FAQ 등록</p>
          <form method="post" name="join" onSubmit={function(e){e.preventDefault(); onSubmit(e)}}>
            <div className="form-div">
              <dl className="form-dl">
                <dt>
                  구분 <span className="required">*</span>
                </dt>
                <dd>
                  <div className="radio-txt">
                    <input type="radio" name="type" id="SVA" defaultChecked/>
                    <label htmlFor="SVA">서비스 이용</label>
                  </div>
                  <div className="radio-txt">
                    <input type="radio" name="type" id="ETC"/>
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
                    <input type="radio" name="expYn" id="Y" defaultChecked />
                    <label htmlFor="Y">노출</label>
                  </div>
                  <div className="radio-txt">
                    <input type="radio" name="expYn" id="N" />
                    <label htmlFor="N">미노출</label>
                  </div>
                </dd>
              </dl>
              <dl className="form-dl">
                <dt>
                  질문 <span className="required">*</span>
                </dt>
                <dd>
                  <input type="text" placeholder="질문을 입력해주세요." name="title" />
                </dd>
              </dl>
              <dl className="form-dl">
                <dt>
                  내용 <span className="required">*</span>
                </dt>
                <dd>
                  <textarea placeholder="내용을 입력해주세요." name="content" />
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