import React from 'react';
import './game.css'
const MIN_X = 0,MAX_X = 700;
const MIN_Y = 0,MAX_Y = 700;
const BAR_MOVE_SPD = 5;
const BALL_DEF_SPD_X = 1;
const BALL_DEF_SPD_Y = 3;
const BALL_DIA = 80;
const BLOCK_ROW = 4;
const BLOCK_COL = 6;

var createInitBlock = () => {
  var res = [];
  for(var row=0;row<BLOCK_ROW;row++){
    for(var col=0;col<BLOCK_COL;col++){
      res.push({
        posX: 120+col*80,
        posY: 150+row*50,
        width: 60,
        height: 30,
        exist: true,
      })
    }
  }
  return res;
}
function clampVal(x,low,high){
  if(x<low) return low;
  if(x>high) return high;
  return x;
}
class DrawHandler extends React.Component{
  render(){
    const bars = this.props.bars.map((bar)=>{
      return(
        <div className="Game-bar"
        key={bar.key}
        style={{
          left: bar.posX+"px",
          top: bar.posY+"px",
          width: bar.width+"px",
          height: bar.height+"px",
        }}
        />
      )
    })
    const blocks = this.props.blocks.map((block,idx)=>{
      return(
        <div className="Game-block"
        key={idx}
        style={{
          left: block.posX+"px",
          top: block.posY+"px",
          width: block.width+"px",
          height: block.height+"px",
        }}
        />
      )
    })
    return(
      <div id="Game-DrawHandler">
        <div className="Game-ball"
        style={{
          left: this.props.ball.posX+"px",
          bottom: this.props.ball.posY+"px",
          width: BALL_DIA/2,
          height: BALL_DIA/2,
        }}
        />
        <div id="Game-bars">
          {bars}
        </div>
        <div id="Game-blocks">
        {blocks}
        </div>
      </div>
    )
  }
}
export default class GameMain extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      ball:{
        posX: 40,
        posY: 20,
        vx: BALL_DEF_SPD_X,
        vy: BALL_DEF_SPD_Y,
      },
      blocks:
        createInitBlock(),
      bars:[
        {posX: 350,posY:  0,
          width: 200,height:  20,key: "top"},
        {posX: 350,posY: 680,
          width: 200,height:  20,key: "bottom"},
        {posX:  0,posY: 350,
          width:  20,height: 200,key: "left"},
        {posX: 680,posY: 350,
          width:  20,height: 200,key: "right"},
      ],
    }
    this.moveBall = this.moveBall.bind(this);
    this.keyHandler = this.keyHandler.bind(this);
    this.timeID = setInterval(
      () => this.moveObject(),
      10
    )
  }
  setBar(bar,moveX,moveY){
    bar.posX = clampVal(bar.posX+moveX,MIN_X,MAX_X-bar.width);
    bar.posY = clampVal(bar.posY+moveY,MIN_Y,MAX_Y-bar.height);
  }
  moveBar(){
    var topBar = this.state.bars[0];
    var bottomBar = this.state.bars[1];
    var leftBar = this.state.bars[2];
    var rightBar = this.state.bars[3];
    if(this.state.upKey){
      this.setBar(leftBar,0,BAR_MOVE_SPD);
      this.setBar(rightBar,0,-BAR_MOVE_SPD);
    }
    if(this.state.downKey){
      this.setBar(leftBar,0,-BAR_MOVE_SPD);
      this.setBar(rightBar,0,BAR_MOVE_SPD);
    }
    if(this.state.leftKey){
      this.setBar(topBar,BAR_MOVE_SPD,0);
      this.setBar(bottomBar,-BAR_MOVE_SPD,0);
    }
    if(this.state.rightKey){
      this.setBar(topBar,-BAR_MOVE_SPD,0);
      this.setBar(bottomBar,BAR_MOVE_SPD,0);
    }
    this.setState({
      bars: [
        topBar,bottomBar,leftBar,rightBar,
      ]
    })
  }
  keyHandler(e,isPushed){
    var upKey = this.state.upKey;
    var downKey = this.state.downKey;
    var leftKey = this.state.leftKey;
    var rightKey = this.state.rightKey;
    switch(e.key){
      case 'ArrowUp':
        upKey = isPushed;
        e.preventDefault();
        break;
      case 'ArrowDown':
        downKey = isPushed;
        e.preventDefault();
        break;
      case 'ArrowLeft':
        leftKey = isPushed;
        e.preventDefault();
        break;
      case 'ArrowRight':
        rightKey = isPushed;
        e.preventDefault();
        break;
      default:
        break;
    }
    this.setState({
      upKey: upKey,
      downKey: downKey,
      leftKey: leftKey,
      rightKey: rightKey,
    })
  }
  hitObject(ball,obj){
  }
  moveBall(){
    var nowX = this.state.ball.posX;
    var nowY = this.state.ball.posY;
    var vx = this.state.ball.vx;
    var vy = this.state.ball.vy;
    var nextX = nowX + vx;
    var nextY = nowY + vy;
    if(nextX < MIN_X ||nextX > MAX_X){
      vx = -vx;
    }

    if(nextY < MIN_Y ||nextY > MAX_Y){
      vy = -vy;
    }
    nextX = clampVal(nextX,MIN_X,MAX_X);
    nextY = clampVal(nextY,MIN_Y,MAX_Y);
    this.setState({
      ball:{
        posX: nextX,
        posY: nextY,
        vx: vx,
        vy: vy,
      }
    })
  }
  moveObject(){
    // this.moveBall();
    this.moveBar();
  }
  render(){
    return(
      <div id="Game"
      onKeyDown={(e)=>this.keyHandler(e,true)}
      onKeyUp={(e)=>this.keyHandler(e,false)}
      tabIndex='0'
      style={{
        width: MAX_X,
        height: MAX_Y,
        minWidth: MAX_X,
        maxHeight: MAX_Y,
      }}
      >
        <DrawHandler
        ball={this.state.ball}
        bars={this.state.bars}
        blocks={this.state.blocks}
        />
      </div>
    )
  }
}
