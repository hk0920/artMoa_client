import React from "react";
import "swiper/css/bundle";
import axios from "axios";
import MainVis from "./MainVis";
import CardList from "../../components/CardList";
import CardList2 from "../../components/CardList2";
import TextList from "../../components/TextList";
import "./main.scss";

class Main extends React.Component {
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
      console.log("메인" + res.data.response.body.items.item)
      console.log(this.state.dataList);
      this.setState({
        dataList:res.data.response.body.items.item
      })
      console.log(this.state.dataList);
    }).catch(error=>{
      console.log("에러" + error)
    });
  }

  componentDidMount(){
    this.list();
  }

  render(){
    return(
      <div id="cBody" className="main">
        <MainVis />
        <section className="main-sec list-sec">
          <div className="inner">
            <CardList2 data={this.state.dataList} />
          </div>
        </section>
        <section className="main-sec notice-sec">
          <div className="inner">
            <div className="title-div">
              <p className="sec-title">Notice</p>
            </div>
            <div className="list-div">
              <TextList />
              <div className="btn-wrap">
                <button type="button" className="txt-more-btn">More</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
};

export default Main;