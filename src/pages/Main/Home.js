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
}
class Main extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      dataList:[]
    }
  }

  list=()=>{
    var xhr = new XMLHttpRequest();
    var url = 'https://cors-anywhere.herokuapp.com/http://www.culture.go.kr/openapi/rest/publicperformancedisplays/period'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'OApFbw/zxEwtqHKqUyc8QWvBESqtoamTLFLeS7zF7RTUAy1MykuCnHPhQzRBtz8vU76BEmXb2aYcPLMmW7KQkw=='; /*Service Key*/
    queryParams += '&' + encodeURIComponent('keyword') + '=' + encodeURIComponent(''); /**/
    queryParams += '&' + encodeURIComponent('sortStdr') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('ComMsgHeader') + '=' + encodeURIComponent(''); /**/
    queryParams += '&' + encodeURIComponent('RequestTime') + '=' + encodeURIComponent('20100810:23003422'); /**/
    queryParams += '&' + encodeURIComponent('CallBackURI') + '=' + encodeURIComponent(''); /**/
    queryParams += '&' + encodeURIComponent('MsgBody') + '=' + encodeURIComponent(''); /**/
    queryParams += '&' + encodeURIComponent('from') + '=' + encodeURIComponent('20100101'); /**/
    queryParams += '&' + encodeURIComponent('to') + '=' + encodeURIComponent('20101201'); /**/
    queryParams += '&' + encodeURIComponent('cPage') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('rows') + '=' + encodeURIComponent('10'); /**/
    queryParams += '&' + encodeURIComponent('place') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('gpsxfrom') + '=' + encodeURIComponent('129.101'); /**/
    queryParams += '&' + encodeURIComponent('gpsyfrom') + '=' + encodeURIComponent('35.142'); /**/
    queryParams += '&' + encodeURIComponent('gpsxto') + '=' + encodeURIComponent('129.101'); /**/
    queryParams += '&' + encodeURIComponent('gpsyto') + '=' + encodeURIComponent('35.142'); /**/
    // xhr.open('GET', url + queryParams);
    // xhr.onreadystatechange = function () {
    //     if (this.readyState == 4) {
    //         alert('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
    //     }
    // };

    // xhr.send('');

    axios.get(url + queryParams).then(res=>{
      console.log(res)
      const dataSet = res.data;
      parseStr(dataSet);
      console.log(dataSet);
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