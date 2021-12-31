import React from "react";
import {Link} from 'react-router-dom';

class TextList extends React.Component {
  render(){
    return(
			<ul className="list text-type">
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
    )
  }
};

export default TextList;