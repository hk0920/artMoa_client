import React, { useEffect } from "react";
import {Link} from 'react-router-dom';
import * as CommonEvt from "../../CommonEvt";
import Accordion from "../../components/Accordion";
import "./member.scss";

const JoinForm=()=>{
	useEffect(()=>{
		CommonEvt.headerStyle();
	})

  return(
    <div id="cBody">
			<div className="sub-vis">
				<div className="bg bg5"></div>
				<h2 className="sub-title">회원가입</h2>
			</div>
			<div className="inner join-div">
				<p className="title">이용약관</p>
				<Accordion />

				<p className="title">회원정보 입력</p>
				<form action="" method="post" name="join">
					<div className="form-div">
						<dl className="form-dl">
							<dt>
								이메일 <span className="required">*</span>
							</dt>
							<dd>
								<input type="text" placeholder="abc@email.com" name="email" />
								<button type="button" className="blue-btn sm">중복 확인</button>
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
								비밀번호 <span className="required">*</span>
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