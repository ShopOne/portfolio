import React from 'react';
import './bio.css';
class BioList extends React.Component{
  render(){
    const bioElements = this.props.bios.map((elm,idx)=>{
      const descText=()=>{
        return(<a id={elm.desc} href={elm.url}>{elm.text}</a>)
      };
      const timeStyle = {
        animationDuration: ((idx+1)*0.3) + "s",
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
class LinkList extends React.Component{
  render(){
    const links = otherLink.map((elm)=>{
      return(
        <li key={elm.desc} className="bio-otherlink-box">
          <a 
          href={elm.url}
          className="bio-otherlink-text"
          >{elm.desc}</a>
        </li>
      )
    })
    return(
      <ul className="bio-otherlinks">
      {links}
      </ul>
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
        <h1 align="center" className="introduction">自己紹介</h1>
        <div id="bio-lists">
          <BioList bios={bioContents[0]} direction="left"/>
          <BioList bios={bioContents[1]} direction="right"/>
        </div>
        <h1 className="bio-otherlink-desc">Other Link</h1>
        <LinkList />
      </div>
    )
  }
}
const bio = [
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
const otherLink = [
  {desc:"AtCoder Account",url:"https://atcoder.jp/users/shop_one"},
  {desc:"Codeforces Account",url:"https://codeforces.com/profile/shop_one"},
  {desc:"App(風来のシレンSFCサポーター)",
    url:"https://play.google.com/store/apps/details?id=com.support.shirensupporter"},
  {desc:"Game(ゆるふわSTG)",url:"https://www.freem.ne.jp/win/game/19515"},
  {desc:"Game(hiyaya_ko)",url:"https://www.freem.ne.jp/win/game/22440"},
]
