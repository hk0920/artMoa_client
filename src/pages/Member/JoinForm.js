import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import $ from "jquery";
import * as CommonEvt from "../../CommonEvt";
import Accordion from "../../components/Accordion";
import "./member.scss";

const termData = [
	{
		id:0,
		title:"이용약관 동의",
		content:"이용약관 내용"
	},
	{
		id:1,
		title:"약관2",
		content:"약관2 내용"
	}
]

const JoinForm=()=>{
	const [member, setMember] = useState({
		email:"",
		pwd:"",
		birthday:"",
		gender:""
	});
	const [memberEmail, setMemberEmail] = useState({
		email:""
	});
	const [idMsg, setIdMsg] = useState({
		type:"",
		msg:""
	});

	useEffect(()=>{
		CommonEvt.headerStyle();
	})

	const onSubmit=(e)=>{
		e.preventDefault(); 
	}

	const overLapEvt=(e)=>{
		const target = e.target;
		const emailVal = $(target).prev("input[name=email]").val().trim();
		
		if(emailVal === "") {
			alert("이메일을 입력해주세요.");
			$(target).prev("input[name=email]").focus();
			return;
		}
		
		setMemberEmail({
			email:emailVal
		});
		let url = "/member/count-by/email";
		axios.post("/httpApi" + url, memberEmail, {
			headers:{
				"X-CLIENT-KEY":"YSFyQHQjbSRvJWElcHJvamVjdCFA"
			}
		}).then((res)=> {
			const useMember = res.data.data;
			console.log(useMember);
			if(useMember === 0){
				setIdMsg({
					type:"success",
					msg:"사용 가능한 이메일입니다. 전송된 인증번호를 입력해주세요."
				});
				sendEmail(emailVal);
			}else{
				setIdMsg({
					type:"error",
					msg:"이미 사용 중인 이메일입니다."
				});
			}
		}).catch((error)=>{
			console.log(error);
		})
	}

	const sendEmail=(e_addr)=>{
		setMemberEmail({
			email:e_addr
		});

		let url = "/member/auth-email";
		console.log("탄다" + e_addr);
		axios.post("/httpApi" + url, memberEmail,{
			headers:{
				"X-CLIENT-KEY":"YSFyQHQjbSRvJWElcHJvamVjdCFA"
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
				<div className="bg bg5"></div>
				<h2 className="sub-title">회원가입</h2>
			</div>
			<div className="inner join-div">
				<p className="content-tit">이용약관</p>
				<Accordion data={termData}/>

				<p className="content-tit">회원정보 입력</p>
				<form method="post" name="join" onSubmit={onSubmit}>
					<div className="form-div">
						<dl className="form-dl">
							<dt>
								이메일 <span className="required">*</span>
							</dt>
							<dd>
								<input type="text" placeholder="abc@email.com" name="email" />
								<button type="button" className="blue-btn sm" onClick={overLapEvt}>중복 확인</button>
								{
									idMsg.type==="success"?
										<div className="certify-div">
											<span className="tit">인증번호</span>
											<input type="text" name="certify" placeholder="인증번호" />
											<button type="button" className="white-btn x-sm certify-btn">인증확인</button>
										</div>
									:""
								}
								{
									idMsg.msg!==""?
										<p className={idMsg.type==="success"?"info-txt success":"info-txt error"}>{idMsg.msg}</p>
									:""
								}
							</dd>
						</dl>
						<dl className="form-dl">
							<dt>
								비밀번호 <span className="required">*</span>
							</dt>
							<dd>
								<input type="password" placeholder="비밀번호" name="pwd" />
								<p className="info-txt">비밀번호는 영문(대/소문자)과 숫자, 특수문자 포함, 8-24이내로 입력하세요.</p>
							</dd>
						</dl>
						<dl className="form-dl">
							<dt>
								비밀번호 확인 <span className="required">*</span>
							</dt>
							<dd>
								<input type="password" placeholder="비밀번호" name="pwd" />
								<p className="info-txt">비밀번호를 다시 한번 입력하세요.</p>
							</dd>
						</dl>
						<dl className="form-dl">
							<dt>
								생년월일 <span className="required">*</span>
							</dt>
							<dd>
								<input type="text" placeholder="생년월일" name="birthday" />
								<p className="info-txt">생년월일 숫자만 입력하세요.</p>
							</dd>
						</dl>
						<dl className="form-dl">
							<dt>
								성별 <span className="required">*</span>
							</dt>
							<dd>
								<div className="radio-txt">
									<input type="radio" name="gender" id="W" defaultChecked />
									<label htmlFor="W">여자</label>
								</div>
								<div className="radio-txt">
									<input type="radio" name="gender" id="M" />
									<label htmlFor="M">남자</label>
								</div>
							</dd>
						</dl>
					</div>
					<div className="btn-wrap">
						<button type="submit" className="blue-btn">회원가입</button>
					</div>
				</form>
			</div>
    </div>
  )
};

export default JoinForm;