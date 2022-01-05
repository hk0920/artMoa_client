import React from "react";
import axios from 'axios';
import XMLparser from "react-xml-parser";
import CardList from "../../components/CardList";

class ArtList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      artData:[]
    }
  }

  parseStr=(dataSet)=>{
    const dataArr = new XMLparser().parseFromString(dataSet).children;
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
          console.log(item)
          this.setState({
            artData:this.state.artData.concat(item)
          })
        }
      })
    }
  }
  
  list=()=>{
    let url="http://cors-anywhere.herokuapp.com/http://www.culture.go.kr/openapi/rest/publicperformancedisplays/period";
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
            <CardList data={this.state.artData} />
          </div>
        </div>
      </div>
    )
  }
};

export default ArtList;