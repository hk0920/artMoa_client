import React from "react";

const Accordion=()=>{
  return(
		<div className="accordion-div">
			<div className="list-top">
				<p className="total">총 <span>13</span>개</p>
			</div>
			<ul className="accordion-list">
				<li className="active">
					<button type="button" className="accordion-btn">
						<p className="tit">faq 질문</p>
					</button>
					<div class="content-div">
						faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq <br/><br/>답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변<br/><br/>답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변faq 답변 faq 답변
					</div>
				</li>
			</ul>

			<div className="btn-wrap">
				<button type="button" className="more-btn">More</button>
			</div>
		</div>
  )
};

export default Accordion;