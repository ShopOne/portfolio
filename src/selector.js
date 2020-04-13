import React from 'react'
export default class Selector extends React.Component{
  
  render(){
    return(
        <div id="selector">
          <button type="text" 
          value="Skill"
          onClick = {this.props.func}
          className ="profile-button">スキル</button>
          <button type="text"
          value="Biography"
          onClick = {this.props.func}>プロフィール</button>
        </div>
    )
  }
}
