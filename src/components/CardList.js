import React from "react";
import {Link} from 'react-router-dom';
import moment from "moment";

const CardList=(data)=> {
	const dataArr = data.data;

	return(
		<ul className="list card-type">
			{
				dataArr.map((item, idx)=>(
					<li key={idx}>
						<Link to={{
							pathname: "/art/detail/" + item.seq
						}}>
							<div className="img-div">
								<img src={item.thumbnail} alt="" />
							</div>
							<div className="txt-div">
								<p className="tit">{item.title}</p>
								<p className="txt">{moment(item.startDate.toString()).format("YYYY.MM.DD")} ~ {moment(item.endDate.toString()).format("YYYY.MM.DD")}</p>
							</div>
						</Link>
					</li>
				))
			}
		</ul>
	)
};

export default CardList;