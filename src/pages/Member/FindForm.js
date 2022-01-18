import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as CommonEvt from "../../CommonEvt";

const FindForm=(props)=>{
	const [title, setTitle] = useState("");

	useEffect(()=>{
		if(props.type==="id") {
			setTitle("이메일 찾기");
		}else{
			setTitle("비밀번호 찾기");
		}
	},[]);

	return(
		<div className="modal-pop">
			<div className="modal-inner">
				<div className="modal-head">
					<p className="title">{title}</p>
				</div>
				<div className="modal-body">
					<form method="post" name="join">
						<div className="form-div">
							{
								props.type==="pwd"?
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
							<button type="submit" className="blue-btn">{title}</button>
						</div>
					</form>
				</div>
				<button type="button" className="close-btn" onClick={props.popEvt}>닫기</button>
			</div>
		</div>	
	)
}

export default FindForm;