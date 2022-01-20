import React, { useEffect, useState } from "react";
import * as CommonEvt from "../../CommonEvt";
import FindForm from "./FindForm";
import "./member.scss";

const LoginForm=(props)=>{
	const [pop, setPop] = useState(false);
	const [popType, setPopType] = useState();
	useEffect(()=>{
		CommonEvt.headerStyle();
	})

	const popEvt=(e)=>{
		const type = e.target.value.split("-")[1];
		setPopType(type);
		setPop(!pop?true:false);
	}

	const onSubmit=(e)=>{
		e.preventDefault(); 
		const username = e.target.username.value;
		const password = e.target.password.value;
		CommonEvt.onLogin(username, password);
	}

  return(
    <div id="cBody">
			<div className="sub-vis">
				<div className="bg bg5"></div>
				<h2 className="sub-title">로그인</h2>
			</div>
			<div className="login-div">
				<form method="post" name="login" onSubmit={onSubmit}>
					<div className="login-form">
						<input type="text" name="username" placeholder="이메일"/>
						<input type="password" name="password" placeholder="비밀번호"/>
					</div>
					<div className="login-util">
						<div className="chk-txt">
							<input type="checkbox" id="remember" name="remember" />
							<label htmlFor="remember">이메일 저장</label>
						</div>
						<div className="find-div">
							<button type="button" value="find-id" onClick={popEvt}>이메일 찾기</button>
							<button type="button" value="find-pwd" onClick={popEvt}>비밀번호 찾기</button>
						</div>
					</div>
					<div className="btn-wrap">
						<button type="submit" className="blue-btn">로그인</button>
					</div>
				</form>
			</div>
			{
				pop?
					<FindForm type={popType} popEvt={popEvt} />
				:""
			}
    </div>
  )
};

export default LoginForm;