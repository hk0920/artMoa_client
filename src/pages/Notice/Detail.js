import React from "react";

class NoticeDetail extends React.Component{
	constructor({location}){
		super();
		this.data = location.state.data;
		console.log(this.data)
		this.state={
			data:""
		}
	}

	getData=()=>{
		this.setState({
			data:this.data
		})
	}

	componentDidMount(){
		this.getData();
	}

	render(){
		return(
			<div id="cBody">
				<div className="sub-vis">
					<div className="bg bg4"></div>
					<h2 className="sub-title">Notice</h2>
				</div>
				<div className="notice-div">
					<div className="inner">
						<div className="title-div">
							<p className="tit"></p>
							<p className="writer">발행기관</p>
							<p className="date">2022.01.05</p>
						</div>
	
						<div className="txt-div">
							공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 공지사항 내용 
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default NoticeDetail;