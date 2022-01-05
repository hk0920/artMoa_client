import React from "react";
import "swiper/css/bundle";
import axios from "axios";
import XMLparser from "react-xml-parser";
import MainVis from "./MainVis";
import CardList from "../../components/CardList";
import TextList from "../../components/TextList";
import "./main.scss";

class Main extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      artData:[],
      noticeData:[]
    }
  }

  parseStr=(dataSet)=>{
    const dataArr = new XMLparser().parseFromString(dataSet).children;
    // eslint-disable-next-line no-lone-blocks
    {
      dataArr.map((item)=>  
        console.log(item.name)
      )
    }
    this.setState({
      artData : dataArr
    })
  }

  artList=()=>{
    var url = 'http://cors-anywhere.herokuapp.com/http://www.culture.go.kr/openapi/rest/publicperformancedisplays/period'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'OApFbw%2FzxEwtqHKqUyc8QWvBESqtoamTLFLeS7zF7RTUAy1MykuCnHPhQzRBtz8vU76BEmXb2aYcPLMmW7KQkw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('cPage') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('rows') + '=' + encodeURIComponent('12'); /**/

    axios.get(url + queryParams).then(res=>{
      const dataSet = res.data;
      this.parseStr(dataSet);
    }).catch(error=>{
      console.log("에러" + error);
    });
  }

  noticeList=()=>{
    var url = "http://api.kcisa.kr/openapi/service/rest/meta2020/getKOCAnotice?serviceKey=7d58e468-50c5-4c98-89be-819d8fdcff3f";

    axios.get(url).then(res=>{
      //console.log(res.data.response.body.items.item);
      this.setState({
        noticeData : res.data.response.body.items.item
      })
    }).catch(error=>{
      console.log(error);
    })
  }

  componentDidMount(){
    this.artList();
    this.noticeList();
  }

  render(){
    return(
      <div id="cBody" className="main">
        <MainVis />
        <section className="main-sec list-sec">
          <div className="inner">
            <CardList data={this.state.artData} />
          </div>
        </section>
        <section className="main-sec notice-sec">
          <div className="inner">
            <div className="title-div">
              <p className="sec-title">Notice</p>
            </div>
            <div className="list-div">
              <TextList data={this.state.noticeData}/>
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