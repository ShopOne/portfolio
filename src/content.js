import React from 'react';
const skills =[
  {img: process.env.PUBLIC_URL+"/cpp.png",skillName:"C++",
   skillDesc: "競技プログラミングとゲーム制作に使用しています。"},
   {img: process.env.PUBLIC_URL+"/kotlin.png", skillName: "Kotlin",
   skillDesc: "Androidアプリ開発に使用しています。"},
   {img: process.env.PUBLIC_URL+"/java.png", skillName: "Java",
     skillDesc: "授業とAndroidアプリ開発で使用しました。"},
   {img: process.env.PUBLIC_URL+"/droid.png", skillName: "Android",
     skillDesc: "アプリを1つリリースしています"},
]
const bio =[
  {desc:"Name",text:"Koki Yamashita",url:null},
  {desc:"Univ",text:"Meiji Univ.",url:"/"},
  {desc:"BirthDay",text:"1999/08/08",url:"/"},
  {desc:"Mail",text:"oneky8080@gmail.com",url:"/"},
  {desc:"GitHub",text:"shopOne",url:"https://github.com/ShopOne"},
  {desc:"GooglePlay Account",text:"shop_one",
  url:"https://play.google.com/store/apps/developer?id=shop_one"},
  {desc:"Qiita",text:"shop_one",url:"https://qiita.com/shop_one"},
  {desc:"Twitter",text:"@_shop_one",url:"https://twitter.com/_shop_one"},
]
class Biography extends React.Component{
  render(){
    const bioElements = bio.map((elm,idx)=>{
      const descText=()=>{
        if(elm.url===null){
          return(<a id={elm.desc} href="/">{elm.text}</a>)
        }else{
          return(<a id={elm.desc} href={elm.url}>{elm.text}</a>)
        }
      };
      return(
        <div key={elm.desc} >
          <p><label htmlFor={elm.desc}>{elm.desc}</label></p>
          <p>{descText()}</p>
        </div>
      )
    })
    console.log(bioElements);
    return(
      <div id="biography">
        <h1 id="introduction"> 自己紹介 </h1>
        {bioElements}
      </div>
    )
  }
}

class Skills extends React.Component{
  render(){
    var skillBody = skills.map((element)=>{
      return(
        <li key={element.skillName} className="skill">
          <img className="skill-image" 
          id={element.skillName}
          alt={element.skillName}
          src={element.img}/>
        <ul className="skill-text">
          <li className="skill-name">{element.skillName}</li>
          <li className="skill-desc">{element.skillDesc}</li>
        </ul>
      </li>
      )
    })
    return(
      <ul>{skillBody}</ul>
    )
  }
}
class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selected: "Biography",
    }
    this.onClickedHandler = this.onClickedHandler.bind(this);
  }
  onClickedHandler(e){
    const clicked = e.target.value;
    this.setState({
      selected: clicked,
    })
  }
  render(){
    var componentChanger = () => {
      switch(this.state.selected){
        case "Skill": 
          return(<Skills />);
        case "Biography":
          return(<Biography />);
        default: break;
      }
    }
    return(
      <div className="Profile">
        <div id="selector">
          <button type="text" 
          value="Skill"
          onClick = {this.onClickedHandler}
          className ="profile-button">スキル</button>
        <button type="text"
        value="Biography"
        onClick = {this.onClickedHandler}>プロフィール</button>
    </div>
    {componentChanger()}
  </div>
    )
  }
}
export default class MainContent extends React.Component{
  render(){
    return(
      <Profile/>
    )
  }
}
