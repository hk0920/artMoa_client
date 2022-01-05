import React from "react";
import DetailInfo from "./DetailInfo";
import DetailLocal from "./DetailLocal";
import DetailVis from "./DetailVis";
import "./art.scss";

class ArtDetail extends React.Component {
	constructor(props) {
		super();
		console.log(this.props);
	}

	componentDidMount(){
		console.log(this.props)
	}

	render(){
		return(
			<div id="cBody">
				<div className="detail-wrap">
					<DetailVis />
					<div className="inner">
						<DetailInfo />
					</div>
					<DetailLocal />
				</div>
			</div>
		)
	}
}

export default ArtDetail;