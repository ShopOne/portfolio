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
