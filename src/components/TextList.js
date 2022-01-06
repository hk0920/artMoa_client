import React from "react";
import {Link} from 'react-router-dom';

class TextList extends React.Component {
	constructor(props){
		super();
		this.state={
			data:[
				{
					title:"",
					context:""
				}
			]
		}
	}

  render(){
    return(
			<ul className="list text-type">
				{
					this.props.data.map((item, idx)=>(
						<li key={idx}>
							<Link to={{
								pathname:"/notice/detail",
								state:{
									title:item.title,
								}
							}}>
								<div className="txt-div">
									<p className="tit">{item.title}</p>
									<div className="txt" dangerouslySetInnerHTML={{__html:item.description}}>
									</div>
									<p className="date">{item.regDate}</p>
								</div>
							</Link>
						</li>
					))
				}
			</ul>
    )
  }
};

export default TextList;