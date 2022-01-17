import React, { useEffect, useState } from "react";
import {useForm} from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import $ from "jquery";
import * as CommonEvt from "../../CommonEvt";

const NoticeWrite=({type})=>{
  const [body, setBody] = useState({
    id:"",
    title:"",
    content:"",
    expYn:"",
    register:""
  });
  const [noticeTitle, setNoticeTitle] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const getData=()=>{
    if(location.pathname === "/notice/save"){
      setNoticeTitle("공지사항 등록");
      setBody({
        expYn:"Y"
      })
    }else if(location.pathname === "/notice/update"){
      let noticeIdx = location.state.idx;
      console.log(noticeIdx);
      setNoticeTitle("공지사항 수정");

      CommonEvt.api.get("/httpApi/support/notice/detail", {
        params:{
          id:noticeIdx
        }
      }).then((res)=>{
        const data = res.data.data.info;
        setBody({
          id:noticeIdx,
          title:data.title,
          content:data.content,
          expYn:data.expYn
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
    e.preventDefault(); 
    
    for(var i=0; i<e.target.expYn.length; i++){
      if(e.target.expYn[i].checked ){
        body.expYn = e.target.expYn[i].id;
      }
    }
    body.title = e.target.title.value;
    body.content = e.target.content.value;

    if(type === "save"){
      CommonEvt.api.post("/httpApi/support/notice/save", body).then((res)=>{
        navigate("/notice");
      }).catch((error)=>{
        console.log(error);
      })
    }else if(type === "update"){
      console.log("수정");
      console.log(body);

      CommonEvt.api.put("/httpApi/support/notice", body).then((res)=>{
        console.log(res);
        navigate("/notice");
      }).catch((error)=>{
        console.log(error.response.data);
      })
    }
  }

  const chkType=(e)=>{
    const target = e.target;

    setBody({
      id:body.id,
      type:body.type,
      title:body.title,
      content:body.content,
      expYn:target.id
    })

    console.log(body);
  }

  useEffect(()=>{
    CommonEvt.headerStyle();
  },[])

  return(
    <div id="cBody">
      <div className="sub-vis">
        <div className="bg bg4"></div>
        <h2 className="sub-title">Notice</h2>
      </div>
      <div className="notice-div inner">
        <div className="write-form">
          <p className="content-tit">{noticeTitle}</p>
          <form method="post" name="notice-form" onSubmit={onSubmit}>
            <div className="form-div">
              <dl className="form-dl">
                <dt>
                  노출여부 <span className="required">*</span>
                </dt>
                <dd>
                  <div className="radio-txt">
                    <input type="radio" name="expYn" id="Y" checked={body.expYn==="Y"?true:false} onChange={chkType} />
                    <label htmlFor="Y">노출</label>
                  </div>
                  <div className="radio-txt">
                    <input type="radio" name="expYn" id="N" checked={body.expYn==="N"?true:false} onChange={chkType}/>
                    <label htmlFor="N">미노출</label>
                  </div>
                </dd>
              </dl>
              <dl className="form-dl">
                <dt>
                  제목 <span className="required">*</span>
                </dt>
                <dd>
                  <input type="text" placeholder="제목을 입력해주세요." name="title" defaultValue={body.title}/>
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

export default NoticeWrite;