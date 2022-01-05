import React from "react";

const DetailInfo=()=>{
	return(
		<div className="detail-info">
			<div className="img-div">
				<img src="https://ddp.or.kr/usr/upload/board_thumb/zboardphotogallery0/20211210044757074.jpg" alt="" />
			</div>
			<div className="info-div">
				<p className="tit">타이틀</p>
				<p className="txt">전시 설명전시 설명전시 설명전시 설명전시 설명전시 설명전시 설명전시 설명전시 설명전시 설명전시 설명전시 설명전시 설명전시 설명전시 설명전시 설명전시 설명전시 설명전시 설명전시 설명전시 설명전시 설명</p>
				<ul className="use-info">
					<li>
						<strong className="bold-txt">지역</strong>
						서울
					</li>
					<li>
						<strong className="bold-txt">전시 장소</strong>
						DDP 동대문디자인플라자 배움터 지하 2층 디자인전시관
					</li>
					<li>
						<strong className="bold-txt">전시 기간</strong>
						2021.11.27 ~ 2022.03.20
					</li>
					<li>
						<strong className="bold-txt">티켓 요금</strong>
						13,000원
					</li>
					<li>
						<strong className="bold-txt">문의처</strong>
						010-8420-5997
					</li>
				</ul>
				<div className="btn-wrap">
					<a href="" className="blue-btn">More</a>
				</div>
			</div>
		</div>
	)
}

export default DetailInfo;