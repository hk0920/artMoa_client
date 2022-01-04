import React from "react";
import axios from 'axios';
import CardList from "../../components/CardList";

class ArtList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      dataList:[]
    }
  }
  
  list=()=>{
    let url="http://api.kcisa.kr/openapi/service/rest/other/getSEMN5601?serviceKey=e3417d31-1b55-49d9-85a7-8211d1ab1069";

    axios.get(url, {
      params:{
        numOfRows:"12",
        pageNo:"5"
      }
    }).then(res=>{
      this.setState({
        dataList:res.data.response.body.items.item
      })
    }).catch(error=>{
      console.log("에러" + error)
    });
  }

  componentDidMount(){
    this.list();
  }

  render(){
    return(
      <div id="cBody">
        <div className="sub-vis">
          <div className="bg bg1"></div>
          <h2 className="sub-title">Exhibition</h2>
        </div>
        <div className="art-div">
          <div className="inner">
            <CardList dataList={this.state.dataList} />
          </div>
        </div>
      </div>
    )
  }
};

export default ArtList;