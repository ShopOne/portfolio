import React from 'react';
import Skills from './skill.js'
import Biography from './bio.js'
import './content.css'

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
