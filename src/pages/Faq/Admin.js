import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BoardRowItem from "../../components/BoardRowItem";
import * as CommonEvt from "../../CommonEvt";

const FaqAdmin=()=>{
	const [faqData, setFaqData] = useState([]);

  useEffect(()=>{
    getData();
    CommonEvt.headerStyle();
  },[]);

	const getData=()=>{
		var url = "/support/faq/list";

		axios.get("/httpApi" + url, {
			headers:{
        "X-CLIENT-KEY":"YSFyQHQjbSRvJWElcHJvamVjdCFA",
			}
		}).then((res) => {
      const dataSet = res.data.data.list;
      setFaqData(faqData.concat(dataSet));
		}).catch((err) => {
			console.log(err);
		})
	}
	console.log(faqData);

	return (
		<div id="cBody">
      <div className="sub-vis">
        <div className="bg bg3"></div>
        <h2 className="sub-title">FAQ</h2>
      </div>
      <div className="faq-div inner">
        <div className="title-div">
          <p className="txt">artMoa 관련 자주 하는 질문을 한곳에 모았습니다.<br/> 아래 질문을 클릭하시면 답변을 확인할 수 있습니다.</p>
        </div>
        <div className="list-div">
          <div className="list-top">
            <div className="left-div">
              <p className="total">총 <span>{faqData.length}</span>개</p>
            </div>
            <div className="right-div">
              <Link to="/faq/update" className="blue-btn sm">수정</Link>
              <Link to="/faq/save" className="blue-btn sm">삭제</Link>
            </div>
          </div>

					<div className="table-div">
						<table>
							<thead>
								<th className="check"></th>
								<th className="num">No</th>
								<th className="type">분류</th>
								<th className="title">타이틀</th>
							</thead>
							<tbody>
								<BoardRowItem data={faqData}/>
							</tbody>
						</table>
					</div>
          <div className="btn-wrap">
            <button type="button" className="blue-btn">More</button>
          </div>
        </div>
      </div>
    </div>
	)
}

export default FaqAdmin;