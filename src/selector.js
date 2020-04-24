import React from 'react'
import './selector.css'
export default class Selector extends React.Component{
  render(){
    const selectorBox = selectorValues.map((elms)=>{
      return(
        <li key={elms.value}
        className="selector-box">
          <button 
          value={elms.value}
          id={elms.id}
          className="selector-button"
          onClick = {this.props.func}>{elms.desc}</button>
        </li>
      )
    })
    return(
        <div id="selector">
          <img 
          src={process.env.PUBLIC_URL+"/logo.png"}
          id="selector-logo"
          alt="logo"/>
          <img 
          src={process.env.PUBLIC_URL+"/tana.png"}
          id="selector-tana"
          className="selector-button"
          alt="logo"/>
          <ul
          align="center"
          id="selector-list">
          {selectorBox}
          </ul>
        </div>
    )
  }
}
const selectorValues = [
  {value: "Biography",id:"selector-bio",desc:"プロフィールとリンク"},
  {value: "Skill",id:"selector-skill",desc:"スキル"},
  {value: "Introduction",id:"selector-bio",desc:"自己紹介"},
  {value: "Game",id:"selector-game",desc:"ゲーム"},
]
