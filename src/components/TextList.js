import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

const TextList=(data)=>{
	const dataArr = data.data;
	
	return(
		<ul className="list text-type">
			{
				dataArr !== null?
					dataArr.map((item, idx)=>(
						<li key={idx}>
							<Link to={{
								pathname: "/notice/detail/" + item.id
							}}>
								<div className="txt-div">
									<p className="tit">{item.title}</p>
									<div className="txt">
										<pre>{item.content}</pre>
									</div>
									<p className="date">{item.registerTime.substring(0,10)}</p>
								</div>
							</Link>
						</li>
					))
				:
					<div className="no-data">
						<p>게시물이 없습니다.</p>
					</div>
			}
		</ul>
	)
};

export default TextList;