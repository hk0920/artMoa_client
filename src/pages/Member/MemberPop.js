import React, { useEffect, useState } from "react";
import $ from "jquery";
import * as CommonEvt from "../../CommonEvt";

const MemberPop=(props)=>{
	const [title, setTitle] = useState("");
	const [user, setUser] = useState({
		id:props.user.id,
		email:props.user.email,
		birthday:props.user.birthday,
		gender:props.user.gender
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
	})

	useEffect(()=>{
		if(props.type==="find-id") {
			setTitle("이메일 찾기");
		}else if(props.type==="find-pwd"){
			setTitle("비밀번호 찾기");
		}else if(props.type==="change-pwd"){
			setTitle("비밀번호 변경");
		}else if(props.type==="change-birth"){
			setTitle("생년월일 변경");
		}else if(props.type==="change-gender"){
			setTitle("성별 변경");
		}
	},[]);

	const genderChk=(e)=>{
    const target = e.target;
		setUser({
			id:user.id,
			gender:target.id
		})
  }

	const pwdChk=(e)=>{
		let result = CommonEvt.pwdValidation(e.target.value);
		setUser({
			id:user.id,
			pwd:e.target.value
		})
		setPwdMsg({
			type:result.type,
			msg:result.msg
		})
	}

	const birthChk=(e)=>{
		let targetVal = e.target.value;
		let result = CommonEvt.birthValidation(targetVal);

		if(targetVal.length > 8) {
			targetVal = targetVal.substring(0,8); 
		}
		if(result.type === "error"){
			targetVal = ""; 
			$(e.target).focus();
		}
		setUser({
			id:user.id,
			birthday:targetVal
		});
		setBirthMsg({
			type:result.type,
			msg:result.msg
		});
	}

	const onSubmit=(e)=>{
		e.preventDefault();

		let url;
		if(e.target.name === "change-birth"){
			url = "/httpApi/member/modify/birthday";
		}else if(e.target.name === "change-gender"){
			url = "/httpApi/member/modify/gender";
		}else if(e.target.name === "change-pwd"){
			url = "/httpApi/member/password";
		}

		CommonEvt.api.put(url, user).then((res)=>{
			props.getData();
			alert("회원 정보 변경 완료되었습니다.");
			$(e.target).parents(".modal-pop").find(".close-btn").click();
		}).catch((error)=>{
			console.log(error);
		})
	}

	return(
		<div className={props.type.split("-")[0] === "change"?"modal-pop change-pop":"modal-pop"}>
			<div className="modal-inner">
				<div className="modal-head">
					<p className="title">{title}</p>
				</div>
				<div className="modal-body">
					<form method="post" name={props.type} onSubmit={onSubmit}>
						<div className="form-div">
							{
								props.type==="find-pwd"?
									<dl className="form-dl">
										<dt>
											이메일 <span className="required">*</span>
										</dt>
										<dd>
											<input type="text" placeholder="abc@email.com" name="email" />
										</dd>
									</dl>
								:""
							}
							{
								props.type==="find-id" || props.type==="find-pwd" || props.type === "change-birth"?
									<>
										<dl className="form-dl">
											<dt>
												생년월일 <span className="required">*</span>
											</dt>
											<dd>
												<input type="text" placeholder="생년월일" name="birthday" value={user.birthday} onChange={birthChk}/>
												<p className="info-txt">생년월일 숫자만 입력하세요.</p>
												{
													birthMsg.msg !==""?
														<p className={birthMsg.type==="error"?"info-txt error":"info-txt"}>{birthMsg.msg}</p>
													:""
												}
											</dd>
										</dl>
									</>
								:""
							}
							{
								props.type==="find-id" || props.type === "find-pwd" || props.type === "change-gender"?
									<dl className="form-dl">
										<dt>
											성별 <span className="required">*</span>
										</dt>
										<dd>
											<div className="radio-txt">
												<input type="radio" name="gender" id="W" checked={user.gender === "W"} onChange={genderChk} />
												<label htmlFor="W">여자</label>
											</div>
											<div className="radio-txt">
												<input type="radio" name="gender" id="M" checked={user.gender === "M"} onChange={genderChk}/>
												<label htmlFor="M">남자</label>
											</div>
										</dd>
									</dl>
								:""
							}
							{
								props.type==="change-pwd"?
									<>
										<dl className="form-dl">
											<dt>
												새 비밀번호 <span className="required">*</span>
											</dt>
											<dd>
												<input type="password" placeholder="새 비밀번호" name="pwd" onChange={pwdChk}/>
												{
													pwdMsg.msg !== ""?
														<p className={pwdMsg.type==="error"?"info-txt error":"info-txt"}>{pwdMsg.msg}</p>
													:""
												}
											</dd>
										</dl>
										<dl className="form-dl">
											<dt>
												새 비밀번호 확인 <span className="required">*</span>
											</dt>
											<dd>
												<input type="password" placeholder="새 비밀번호 확인" name="pwd2" onChange={pwdChk}/>
												{
													pwdMsg2.msg !== ""?
														<p className={pwdMsg2.type==="error"?"info-txt error":"info-txt"}>{pwdMsg2.msg}</p>
													:""
												}
											</dd>
										</dl>
									</>
								:""
							}
						</div>
						<div className="btn-wrap">
							<button type="submit" className="blue-btn">{title}</button>
						</div>
					</form>
				</div>
				<button type="button" className="close-btn" onClick={props.popEvt}>닫기</button>
			</div>
		</div>	
	)
}

export default MemberPop;