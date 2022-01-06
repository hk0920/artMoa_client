
import React from "react";
import XMLparser from "react-xml-parser";

class CommonEvt extends React {
	constructor(props){
		super();

		this.parseStr = this.parseStr.bind(this);
	}

	parseStr=(dataSet)=>{
		const dataArr = new XMLparser().parseFromString(dataSet).children;
		console.log(dataArr);
		let dataList = [];
		// eslint-disable-next-line no-lone-blocks
		{
			dataArr.map((item) => {
				if(item.name === "msgBody") {
					//console.log(item.children);
					dataList = item.children;
				}
			});

			dataList.map((item)=>{
				if(item.name === "perforList"){
					//console.log(item)
					this.setState({
						artData:this.state.artData.concat(item)
					})
				}
			})
		}
	}
}

export default CommonEvt;