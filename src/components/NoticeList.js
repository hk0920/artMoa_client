import React from "react";
import {Link} from 'react-router-dom';

class NoticeList extends React.Component {
  render(){
    return(
      <div className="list-div">
				<ul className="list notice-type">
					<li>
						<Link to="">
							<div className="txt-div">
								<p className="tit">타이틀 타이틀 타이틀 타이틀 타이틀 타이틀타이틀타이틀타이틀타이틀타이틀</p>
								<p className="txt">텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트</p>
								<p className="date">2021-12-28</p>
							</div>
						</Link>
					</li>
					<li>
						<Link to="">
							<div className="txt-div">
								<p className="tit">타이틀 타이틀 타이틀 타이틀 타이틀 타이틀타이틀타이틀타이틀타이틀타이틀</p>
								<p className="txt">텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트</p>
								<p className="date">2021-12-28</p>
							</div>
						</Link>
					</li>
					<li>
						<Link to="">
							<div className="txt-div">
								<p className="tit">타이틀 타이틀 타이틀 타이틀 타이틀 타이틀타이틀타이틀타이틀타이틀타이틀</p>
								<p className="txt">텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트</p>
								<p className="date">2021-12-28</p>
							</div>
						</Link>
					</li>
					<li>
						<Link to="">
							<div className="txt-div">
								<p className="tit">타이틀 타이틀 타이틀 타이틀 타이틀 타이틀타이틀타이틀타이틀타이틀타이틀</p>
								<p className="txt">텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트텍스트 텍스트</p>
								<p className="date">2021-12-28</p>
							</div>
						</Link>
					</li>
				</ul>
				<div className="btn-wrap">
					<button type="button" className="txt-more-btn">More</button>
				</div>
			</div>	
    )
  }
};

export default NoticeList;