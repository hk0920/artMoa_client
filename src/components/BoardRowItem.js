import React from "react";

const BoardRowItem=({data})=>{
	console.log(data);

	return (
		data.map((item, idx)=>(
			<tr key={idx}>
				<td>
					<div className="chk-txt">
						<input type="checkbox" id={item.id} />
						<label htmlFor={item.id}>&nbsp;</label>
					</div>
				</td>
				<td>{-(idx - data.length)}</td>
				<td>{item.title}</td>
				<td>{item.register}</td>
				<td>{item.readCnt}</td>
				<td>{item.registerTime}</td>
			</tr>
		))
	)
}

export default BoardRowItem;