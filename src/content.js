import React from 'react';
import Skills from './skill.js'
import Biography from './bio.js'
import './content.css'
import Selector from './selector.js'
import Description from './introduction.js'

class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selected: "",
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
      console.log(this.state.selected);
      switch(this.state.selected){
        case "Skill": 
          return(<Skills />);
        case "Biography":
          return(<Biography />);
        case "Introduction":
          return (<Description />);
          default:
          return(<div />);
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
