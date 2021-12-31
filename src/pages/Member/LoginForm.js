import React from "react";
import {Link} from 'react-router-dom';
import "./member.scss";

const LoginForm=()=>{
  return(
    <div id="cBody">
			<div className="sub-vis">
				<div className="bg bg5"></div>
				<h2 className="sub-title">로그인</h2>
			</div>
			<div className="login-div">
				<form action="" method="post" name="login">
					<div className="login-form">
						<input type="text" name="email" placeholder="이메일"/>
						<input type="password" name="pwd" placeholder="비밀번호"/>
					</div>
					<div className="login-util">
						<div className="chk-txt">
							<input type="checkbox" id="remember" name="remember" />
							<label htmlFor="remember">이메일 저장</label>
						</div>
						<div className="find-div">
							<Link to="">이메일 찾기</Link>
							<Link to="">비밀번호 찾기</Link>
						</div>
					</div>
					<div className="btn-wrap">
						<button className="blue-btn">로그인</button>
					</div>
				</form>
			</div>
    </div>
  )
};

export default LoginForm;