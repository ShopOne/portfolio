import React from 'react';
import './game.css'
class DrawHandler extends React.Component{
  render(){
    return(
      <div id="Game-DrawHandler">
        <div className="Game-ball"
        style={{
          left: this.props.ballPosX+"%",
          bottom: this.props.ballPosY+"%",
        }}
        />
      </div>
    )
  }
}
function clampVal(x,low,high){
  if(x<low) return low;
  if(x>high) return high;
  return x;
}
export default class GameMain extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      ballPosX: 40,
      ballPosY: 20,
      ballVX: 0.3,
      ballVY: 1.0,
    }
    this.moveBall = this.moveBall.bind(this);
    this.timeID = setInterval(
      () => this.moveBall(),
      10
    )
  }
  minX = 0;
  maxX = 86;
  minY = 0
  maxY = 85;
  moveBall(){
    var nowX = this.state.ballPosX;
    var nowY = this.state.ballPosY;
    var vx = this.state.ballVX;
    var vy = this.state.ballVY;
    var nextX = nowX + vx;
    var nextY = nowY + vy;
    if(nextX < this.minX ||nextX > this.maxX){
      vx = -vx;
    }

    if(nextY < this.minY ||nextY > this.maxY){
      vy = -vy;
    }
    nextX = clampVal(nextX,this.minX,this.maxX);
    nextY = clampVal(nextY,this.minY,this.maxY);
    this.setState({
      ballPosX: nextX,
      ballPosY: nextY,
      ballVX: vx,
      ballVY: vy,
    })
  }
  render(){
    return(
      <div id="Game">
        <DrawHandler
        ballPosX={this.state.ballPosX}
        ballPosY={this.state.ballPosY}
        />
      </div>
    )
  }
}
