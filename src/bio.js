import React from 'react';
import './bio.css';
class BioList extends React.Component{
  render(){
    const bioElements = this.props.bios.map((elm,idx)=>{
      const descText=()=>{
        return(<a id={elm.desc} href={elm.url}>{elm.text}</a>)
      };
      const timeStyle = {
        animationDuration: ((idx+1)*1) + "s",
      };
      var boxClassName = "bio-box bio-box-"+this.props.direction;
      if(elm.url != null) boxClassName += " valid-link";
      return(
        <div 
        key={elm.desc}
        className={boxClassName}
        style={timeStyle}>
          <p className="bio-label">
            <label htmlFor={elm.desc}>{elm.desc}</label>
          </p>
          <p className="bio-text">
          {descText()}
          </p>
        </div>
      )
    })
    var listClassName = "bio-list bio-list-"+this.props.direction;
    return(
      <div className={listClassName} id={"bio-"+this.props.direction}>
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
      <div id="bio" align="center">
        <BioList bios={bioContents[0]} direction="left"/>
        <BioList bios={bioContents[1]} direction="right"/>
      </div>
    )
  }
}
const bio =[
  {desc:"Name",text:"Koki Yamashita",url:null},
  {desc:"Univ",text:"Meiji Univ.",url:null},
  {desc:"BirthDay",text:"1999/08/08",url:null},
  {desc:"Mail",text:"oneky8080(a)gmail.com",url:null},
  {desc:"GitHub",text:"shopOne",url:"https://github.com/ShopOne"},
  {desc:"GooglePlay Account",text:"shop_one",
  url:"https://play.google.com/store/apps/developer?id=shop_one"},
  {desc:"Qiita",text:"shop_one",url:"https://qiita.com/shop_one"},
  {desc:"Twitter",text:"@_shop_one",url:"https://twitter.com/_shop_one"},
]
