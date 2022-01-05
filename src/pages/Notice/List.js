import axios from "axios";
import React from "react";
import TextList from "../../components/TextList";

class NoticeList extends React.Component {
  constructor(props){
    super();

    this.state = {
      dataList:[]
    }
  }

  getList(){
    let url = "http://api.kcisa.kr/openapi/service/rest/meta2020/getKOCAnotice?serviceKey=7d58e468-50c5-4c98-89be-819d8fdcff3f";
    
    axios.get(url).then(res=>{
      console.log(res);
      this.setState({
        dataList:res.data.response.body.items.item
      })
    }).catch(error=>{
      console.log("에러" + error);
    })
  }

  componentDidMount(){
    this.getList();
  }

  render(){
    return (
      <div id="cBody">
        <div className="sub-vis">
          <div className="bg bg4"></div>
          <h2 className="sub-title">Notice</h2>
        </div>
        <div className="notice-div">
          <div className="inner">
            <div className="list-div">
              <TextList data={this.state.dataList}/>
              <div className="btn-wrap">
                <button type="button" className="blue-btn">More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default NoticeList;