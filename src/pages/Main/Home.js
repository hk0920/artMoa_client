import React from "react";
import "swiper/css/bundle";
import axios from "axios";
import XMLparser from "react-xml-parser";
import MainVis from "./MainVis";
import CardList from "../../components/CardList";
import TextList from "../../components/TextList";
import "./main.scss";

function parseStr(dataSet){
  const dataArr = new XMLparser().parseFromString(dataSet).children;
  console.log(dataArr);
  {
    dataArr.map((item) => {
      if(item.name === "msgBody") {
        console.log(item.children);
      }
    });
  }
}

class Main extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      dataList:[]
    }
  }

  list=()=>{
    var url = 'http://cors-anywhere.herokuapp.com/http://www.culture.go.kr/openapi/rest/publicperformancedisplays/period'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'OApFbw%2FzxEwtqHKqUyc8QWvBESqtoamTLFLeS7zF7RTUAy1MykuCnHPhQzRBtz8vU76BEmXb2aYcPLMmW7KQkw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('cPage') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('rows') + '=' + encodeURIComponent('12'); /**/

    axios.get(url + queryParams).then(res=>{
      const dataSet = res.data;
      parseStr(dataSet);
    }).catch(error=>{
      console.log("에러" + error);
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
            <CardList dataList={this.state.dataList} />
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