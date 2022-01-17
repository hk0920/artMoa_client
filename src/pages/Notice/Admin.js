import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BoardRowItem from "../../components/BoardRowItem";
import * as CommonEvt from "../../CommonEvt";

const NoticeAdmin=()=>{
	const [noticeData, setNoticeData] = useState([]);

  useEffect(()=>{
    getData();
    CommonEvt.headerStyle();
  },[]);

	const getData=()=>{
		CommonEvt.api.get("/httpApi/support/notice/list").then((res) => {
      const dataSet = res.data.data.list;
      console.log(dataSet);
      setNoticeData(dataSet);
		}).catch((err) => {
			console.log(err);
		})
	}

	return (
		<div id="cBody">
      <div className="sub-vis">
        <div className="bg bg4"></div>
        <h2 className="sub-title">NOTICE</h2>
      </div>
      <div className="notice-div inner">
        <div className="list-div">
          <div className="list-top">
            <div className="left-div">
              <p className="total">총 <span>{noticeData.length}</span>개</p>
            </div>
            <div className="right-div">
              <Link to="/notice/update" className="blue-btn sm">수정</Link>
              <Link to="/notice/save" className="blue-btn sm">삭제</Link>
            </div>
          </div>

					<div className="table-div">
						<table>
							<thead>
								<th className="check">.</th>
								<th className="num">No</th>
								<th className="title">타이틀</th>
                <th className="writer">작성자</th>
                <th className="read">조회수</th>
                <th className="date">작성일</th>
							</thead>
							<tbody>
								<BoardRowItem data={noticeData}/>
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

export default NoticeAdmin;