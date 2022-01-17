import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

const TextList=(data)=>{
	const dataArr = data.data;
	
	return(
		<ul className="list text-type">
			{
				dataArr.map((item, idx)=>(
					<li key={idx}>
						<Link to={"/notice/detail"} state={{info:item}}>
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
			}
		</ul>
	)
};

export default TextList;