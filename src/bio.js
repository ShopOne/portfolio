import React from 'react';
import './bio.css';
const bio =[
  {desc:"Name",text:"Koki Yamashita",url:null},
  {desc:"Univ",text:"Meiji Univ.",url:null},
  {desc:"BirthDay",text:"1999/08/08",url:null},
  {desc:"Mail",text:"oneky8080@gmail.com",url:null},
  {desc:"GitHub",text:"shopOne",url:"https://github.com/ShopOne"},
  {desc:"GooglePlay Account",text:"shop_one",
  url:"https://play.google.com/store/apps/developer?id=shop_one"},
  {desc:"Qiita",text:"shop_one",url:"https://qiita.com/shop_one"},
  {desc:"Twitter",text:"@_shop_one",url:"https://twitter.com/_shop_one"},
]
class BioList extends React.Component{
  render(){
    const bioElements = this.props.bios.map((elm,idx)=>{
      const descText=()=>{
        return(<a id={elm.desc} href={elm.url}>{elm.text}</a>)
      };
      var className = "bio-box";
      if(elm.url != null) className += " valid-link";
      return(
        <div key={elm.desc} className={className}>
          <p className="bio-label">
            <label htmlFor={elm.desc}>{elm.desc}</label>
          </p>
          <p className="bio-text">
          {descText()}
          </p>
        </div>
      )
    })
    return(
      <div className="bio-list" id={this.props.id}>
      {bioElements}
      </div>
    )
  }
}
export default class Biography extends React.Component{
  render(){
    const bioContents=[[],[]];
    bio.forEach((elm,idx)=>{
      bioContents[idx%2].push(elm);
    })
    return(
      <div id="bio">
        <BioList bios={bioContents[0]} id="bio-left"/>
        <BioList bios={bioContents[1]} id="bio-right"/>
      </div>
    )
  }
}
