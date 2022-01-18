import React, { useEffect, useState } from "react";
import moment from "moment";
import * as CommonEvt from "../../CommonEvt";

const MyPage=()=>{
	const [user, setUser] = useState({
		id:"",
		email:"",
		birthday:"",
		gender:""
	});
	useEffect(()=>{
		CommonEvt.headerStyle();
		getData();
	},[])

	const getData=()=>{
		CommonEvt.api.post("/httpApi/member/find-by/email", {email:"gmlrb920@naver.com"}).then((res)=>{
			const userInfo = res.data.data.info;
			setUser({
				id:userInfo.id,
				email:userInfo.email,
				birthday:userInfo.birthday,
				gender:userInfo.gender
			})
		}).catch((error)=>{
			console.log(error);
		})
	}
	
	return(
		<div id="cBody">
			<div className="sub-vis">
				<div className="bg bg5"></div>
				<h2 className="sub-title">마이페이지</h2>
			</div>
			<div className="inner mypage-div">
				<div className="info-div">
					<p class="tit">artMoa를 이용해주셔서 감사합니다.</p>
					<span className="name">{user.email.split("@")[0]}</span> 님의 회원정보입니다.<br/>
					회원정보는 개인정보처리방침에 따라 안전하게 보호되며, 회원님의 명백한 동의 없이 공개 또는 제 3자에서 공개되지 않습니다.<br/>
				</div>

				<p className="content-tit">회원정보</p>
				<div className="form-div">
					<dl className="form-dl">
						<dt>이메일</dt>
						<dd>
							<p className="txt">{user.email}</p>
						</dd>
					</dl>
					<dl className="form-dl">
						<dt>비밀번호</dt>
						<dd>
							<button type="button" className="white-btn sm">비밀번호 변경</button>
						</dd>
					</dl>
					<dl className="form-dl">
						<dt>생년월일</dt>
						<dd>
							<span class="txt">{moment(user.birthday.toString()).format("YYYY-MM-DD")}</span>
							<button type="button" className="white-btn sm">생년월일 변경</button>
						</dd>
					</dl>
					<dl className="form-dl">
						<dt>성별</dt>
						<dd>
							<span class="txt">{user.gender==="W"?"여성":"남성"}</span>
							<button type="button" className="white-btn sm">성별 변경</button>
						</dd>
					</dl>
				</div>
			</div>
		</div>
	)
}

export default MyPage;