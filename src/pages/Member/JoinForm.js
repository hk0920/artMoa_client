import React, { useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import $ from "jquery";
import * as CommonEvt from "../../CommonEvt";
import Accordion from "../../components/Accordion";
import "./member.scss";
import Term1 from "./Term1";
import Term2 from "./Term2";

const termData = [
	{
		id:0,
		title:"이용약관 동의",
		content:<Term1 />
	},
	{
		id:1,
		title:"개인 정보 처리 방침",
		content:<Term2 />
	}
]

const JoinForm=()=>{
	const [member, setMember] = useState({
		email:"",
		pwd:"",
		birthday:"",
		gender:""
	});
	const [idMsg, setIdMsg] = useState({
		type:"",
		msg:""
	});
	const [pwdMsg, setPwdMsg] = useState({
		type:"",
		msg:""
	});
	const [pwdMsg2, setPwdMsg2] = useState({
		type:"",
		msg:""
	});
	const [birthMsg, setBirthMsg] = useState({
		type:"",
		msg:""
	});
	const [emailChk, setEmailChk] = useState(false);
	const navigate = useNavigate();

	useEffect(()=>{
		CommonEvt.headerStyle();
	});

		
	const emailValidation=(e)=>{
		var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		const email = e.target.value;

		if(!regExp.test(email)){
			setIdMsg({
				type:"error",
				msg:"이메일 형식이 올바르지 않습니다."
			});
		}else{
			setEmailChk(true);
			setIdMsg({
				type:"error",
				msg:""
			})
		}
	}

	const pwdValidation=(e)=>{
		var regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,24}$/;
		const pwd = e.target.value;
		member.pwd = pwd;

		if(pwd === "") {
			setPwdMsg({
				type:"error",
				msg:"비밀번호를 입력해주세요."
			})
			return;
		}

		if(!regExp.test(pwd)) {
			setPwdMsg({
				type:"error",
				msg:"비밀번호 형식이 일치하지 않습니다."
			})
		}else{
			setPwdMsg({
				type:"success",
				msg:""
			})
		}

		const pwd2 = $(e.target).parents("form[name=join]").find("input[name=pwd2]").val();
		if(pwd2.length > 0) {
			if(pwd2 !== member.pwd) {
				setPwdMsg2({
					type:"error",
					msg:"비밀번호가 일치하지 않습니다."
				})
			}else{
				setPwdMsg2({
					type:"success",
					msg:""
				})
			}
		}
	}

	const pwdCheck=(e)=>{
		const pwd2 = e.target.value;
		console.log(pwd2);
		if(pwd2 !== member.pwd) {
			setPwdMsg2({
				type:"error",
				msg:"비밀번호가 일치하지 않습니다."
			})
		}else{
			setPwdMsg2({
				type:"success",
				msg:""
			})
		}
	}

	const birthValidation=(e)=>{
		var regExp = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
		var numRegExp = /[^0-9]/;
		const birth = e.target.value;

		if($(e.target).val().length > 8) {
			$(e.target).val(birth.substring(0,8));
		}
		if(!regExp.test(birth)){
			if(numRegExp.test(birth)){
				$(e.target).val("").focus();
				setBirthMsg({
					type:"error",
					msg:"문자열이 포함되어있습니다.숫자만 입력해주세요."
				})
			}
		}else{
			setBirthMsg({
				type:"success",
				msg:""
			})
		}
	}

	const overLapEvt=(e)=>{
		const target = e.target;
		const emailVal = $(target).prev("input[name=email]").val().trim();

		console.log(emailVal);
		
		if(!emailChk){	
			if(emailVal === "") {
				alert("이메일을 입력해주세요.");
			}else{
				alert("이메일을 다시 확인 후 입력해주세요.");
			}
			$(target).prev("input[name=email]").focus();
			return;
		}

		if(emailChk){
			CommonEvt.api.post("/httpApi/member/count-by/email", {email:emailVal}).then((res)=> {
				const useMember = res.data.data;
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
	}

	const sendEmail=(e_addr)=>{
		CommonEvt.api.post("/httpApi/member/auth-email", {to:e_addr}).then((res)=>{
			console.log(res);
		}).catch((error)=>{
			console.log(error);
		})
	}

	const emailChkEvt=(e)=>{
		const certify = $(e.target).prev("input[name=certify]").val();
		console.log($(e.target).prev("input[name=certify]").val());
		CommonEvt.api.post("/httpApi/member/check-email", {to:"gmlrb920@naver.com", number:certify}).then((res)=>{
			console.log(res);
		}).catch((error)=>{
			console.log(error);
		})	
	}

	const onSubmit=(e)=>{
		e.preventDefault(); 

		member.email = e.target.email.value;
		member.pwd = e.target.pwd.value;
		member.birthday = e.target.birthday.value;
		for(var i=0; i<e.target.gender.length; i++){
			if(e.target.gender[i].checked){
				member.gender = e.target.gender[i].id;
			}
		}
		
		console.log(idMsg.type, pwdMsg.type, pwdMsg2.type, birthMsg.type);
		if(idMsg.type !== "success" || pwdMsg.type !== "success" || pwdMsg2.type !== "success" || birthMsg.type !== "success"){
			alert("회원정보 조건을 다시 확인해주세요.");
		}else{
			console.log(member);

			let url = "/member/join/save";
			CommonEvt.api.post("/httpApi" + url, member).then((res)=>{
				console.log(res);
				alert("회원가입 완료되었습니다.");
				navigate("/");
			}).catch((error)=>{
				console.log(error);
			})
		}
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
								<input type="text" placeholder="abc@email.com" name="email" onChange={emailValidation}/>
								<button type="button" className="blue-btn sm" onClick={overLapEvt}>중복 확인</button>
								{
									idMsg.type==="success"?
										<div className="certify-div">
											<span className="tit">인증번호</span>
											<input type="text" name="certify" placeholder="인증번호" />
											<button type="button" className="white-btn x-sm certify-btn" onClick={emailChkEvt}>인증확인</button>
										</div>
									:""
								}
								{
									idMsg.msg!==""?
										<p className={idMsg.type==="error"?"info-txt error":"info-txt"}>{idMsg.msg}</p>
									:""
								}
							</dd>
						</dl>
						<dl className="form-dl">
							<dt>
								비밀번호 <span className="required">*</span>
							</dt>
							<dd>
								<input type="password" placeholder="비밀번호" name="pwd" onChange={pwdValidation}/>
								<p className="info-txt">비밀번호는 영문(대/소문자)과 숫자, 특수문자 포함, 8-24이내로 입력하세요.</p>
								{
									pwdMsg.msg!==""?
										<p className={pwdMsg.type==="error"?"info-txt error":"info-txt"}>{pwdMsg.msg}</p>
									:""
								}
							</dd>
						</dl>
						<dl className="form-dl">
							<dt>
								비밀번호 확인 <span className="required">*</span>
							</dt>
							<dd>
								<input type="password" placeholder="비밀번호" name="pwd2" onChange={pwdCheck}/>
								<p className="info-txt">비밀번호를 다시 한번 입력하세요.</p>
								{
									pwdMsg2.msg!==""?
										<p className={pwdMsg2.type==="error"?"info-txt error":"info-txt"}>{pwdMsg2.msg}</p>
									:""
								}
							</dd>
						</dl>
						<dl className="form-dl">
							<dt>
								생년월일 <span className="required">*</span>
							</dt>
							<dd>
								<input type="text" placeholder="생년월일" name="birthday" onChange={birthValidation} />
								<p className="info-txt">생년월일 숫자만 입력하세요.</p>
								{
									birthMsg.msg!==""?
										<p className={birthMsg.type==="error"?"info-txt error":"info-txt"}>{birthMsg.msg}</p>
									:""
								}
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