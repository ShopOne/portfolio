import React from 'react';
import Skills from './skill.js'
import Biography from './bio.js'
import './content.css'
import Selector from './selector.js'

class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selected: "Biography",
    }
    this.onClickedHandler = this.onClickedHandler.bind(this);
  }
  onClickedHandler(e){
    console.log(e.target);
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
        <Selector func={this.onClickedHandler} />
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
