import React from 'react';
import './skill.css';
export default class Skills extends React.Component{
  render(){
    var skillBody = skills.map((element)=>{
      return(
        <li key={element.skillName} className="skill">
          <img className="skill-image" 
          id={element.skillName}
          alt={element.skillName}
          src={element.img}/>
        <ul className="skill-text">
          <li className="skill-name" align="left">{element.skillName}</li>
          <li className="skill-desc">{element.skillDesc}</li>
        </ul>
      </li>
      )
    })
    return(
      <div id="skill-list" align="center">
        <ul id="skill-list-ul">{skillBody}</ul>
      </div>
    )
  }
}
const skills =[
  {img: process.env.PUBLIC_URL+"/cpp.png",skillName:"C++",
   skillDesc: "競技プログラミングとゲーム制作に使用しています。"},
   {img: process.env.PUBLIC_URL+"/kotlin.png", skillName: "Kotlin",
   skillDesc: "Androidアプリ開発に使用しています。"},
   {img: process.env.PUBLIC_URL+"/java.png", skillName: "Java",
     skillDesc: "授業とAndroidアプリ開発で使用しました。"},
   {img: process.env.PUBLIC_URL+"/jvsc.png", skillName: "JavaScript",
     skillDesc: "web制作の際に使用しています。"},
   {img: process.env.PUBLIC_URL+"/droid.png", skillName: "Android",
     skillDesc: "アプリを1つリリースしています"},
   {img: process.env.PUBLIC_URL+"/react.png", skillName: "React",
     skillDesc: "このサイトはReactを使用して作りました。"},
]
