import React from 'react';
import './content.css'
const skills =[
  {img: process.env.PUBLIC_URL+"/cpp.png",skillName:"C++"},
  {img: process.env.PUBLIC_URL+"/kotlin.png", skillName: "Kotlin"},
]

class Skills extends React.Component{
  render(){
    var skillBody = skills.map((element)=>{
      console.log(element.img);
      return(
        <li key={element.skillName} className="skill">
          <img className="skill-image" 
          alt={element.skillName}
          src={element.img}/>
        <div className="skill-name">{element.skillName}</div>
      </li>
      )
    })
    return(
      <ul>{skillBody}</ul>
    )
  }
}
class Profile extends React.Component{
  render(){
    return(
      <div className="Profile">
        <Skills/>
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
