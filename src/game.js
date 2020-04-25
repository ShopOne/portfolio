import React from 'react';
import './game.css'
const MIN_X = 0,MAX_X = 700;
const MIN_Y = 0,MAX_Y = 700;
const BALL_DEF_X = 400;
const BALL_DEF_Y = 400;
const BAR_MOVE_SPD = 5;
const BALL_DEF_SPD_X = 1;
const BALL_DEF_SPD_Y = 3;
const BALL_DIA = 40;
const BLOCK_ROW = 4;
const BLOCK_COL = 7;

function absClossProduct(x1,y1,x2,y2){
  return Math.abs(x1*y2 - y1*x2);
}
function dotProduct(x1,y1,x2,y2){
  return x1*x2+y1*y2;
}
function square(x){
  return x*x;
}
function clampVal(x,low,high){
  if(x<low) return low;
  if(x>high) return high;
  return x;
}
function hitLine(ball,x1,y1,x2,y2){
    const rad = ball.rad;
    const bx = ball.posX+rad;
    const by = ball.posY+rad;
    if(rad>=absClossProduct(x2-x1,y2-y1,bx-x1,by-y1)/
       Math.sqrt(square(x2-x1)+square(y2-y1))){
      if(dotProduct(bx-x1,by-y1,x2-x1,y2-y1)*
          dotProduct(bx-x2,by-y2,x2-x1,y2-y1)<=0){
        return true;
      }else if(square(rad) > square(bx-x1)+square(by-y1) ||
             square(rad) > square(bx-x2)+square(by-y2)){
        return true;
      }
    }
    return false;
  }
var createInitBlock = () => {
  var res = [];
  for(var row=0;row<BLOCK_ROW;row++){
    for(var col=0;col<BLOCK_COL;col++){
      res.push({
        posX: 110+col*71,
        posY: 150+row*40,
        width: 60,
        height: 30,
        exist: true,
        vx: 0,
        vy: 0,
      })
    }
  }
  return res;
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
          display: block.exist ? "block":"none",
        }}
        />
      )
    })
    return(
      <div id="Game-DrawHandler">
        <div className="Game-ball"
        style={{
          left: this.props.ball.posX+"px",
          top: this.props.ball.posY+"px",
          width: BALL_DIA,
          height: BALL_DIA,
          rad: BALL_DIA/2,
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
      gameMode: "stop",
      ball:{
        posX: BALL_DEF_X,
        posY: BALL_DEF_Y,
        vx: BALL_DEF_SPD_X,
        vy: BALL_DEF_SPD_Y,
        rad: BALL_DIA/2,
      },
      blocks:
        createInitBlock(),
      blockNum: 0,
      bars:[
        {posX: 0, posY:  0,
          width: 200, height:  20,
          vx:0, vy:0, key: "top"},
        {posX: 500, posY: 680,
          width: 200, height:  20,
          vx:0, vy:0, key: "bottom"},
        {posX:  0, posY: 0,
          width:  20, height: 200,
          vx:0, vy:0, key: "left"},
        {posX: 680, posY: 500,
          width:  20, height: 200,
          vx:0, vy:0, key: "right"},
      ],
    }
    this.moveBall = this.moveBall.bind(this);
    this.keyHandler = this.keyHandler.bind(this);
    this.timeID = setInterval(
      () => this.moveObject(),
      10
    )
  }
  setBar(bar){
    const moveX = bar.vx;
    const moveY = bar.vy;
    bar.posX = clampVal(bar.posX+moveX,MIN_X,MAX_X-bar.width);
    bar.posY = clampVal(bar.posY+moveY,MIN_Y,MAX_Y-bar.height);
  }
  formatBarSpd(bar){
    bar.vx = 0;
    bar.vy = 0;
  }
  moveBar(){
    var topBar = this.state.bars[0];
    var bottomBar = this.state.bars[1];
    var leftBar = this.state.bars[2];
    var rightBar = this.state.bars[3];
    this.formatBarSpd(topBar);
    this.formatBarSpd(bottomBar);
    this.formatBarSpd(leftBar);
    this.formatBarSpd(rightBar);
    if(this.state.upKey){
      leftBar.vy = BAR_MOVE_SPD;
      rightBar.vy = -BAR_MOVE_SPD;
    }
    if(this.state.downKey){
      leftBar.vy = -BAR_MOVE_SPD;
      rightBar.vy = +BAR_MOVE_SPD;
    }
    if(this.state.leftKey){
      topBar.vx = BAR_MOVE_SPD;
      bottomBar.vx = -BAR_MOVE_SPD;
    }
    if(this.state.rightKey){
      topBar.vx = -BAR_MOVE_SPD;
      bottomBar.vx = BAR_MOVE_SPD;
    }
    this.setBar(topBar);
    this.setBar(bottomBar);
    this.setBar(rightBar);
    this.setBar(leftBar);
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
    var gameMode = this.state.gameMode;
    var blocks = this.state.blocks;
    var ball = this.state.ball;
    var blockNum = this.state.blockNum;
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
        break;
      case ' ':
        if(gameMode==="stop"){
          gameMode = "onGame";
      }else if(gameMode==="end"){
        this.refleshblocks(blocks);
        this.refleshBall(ball);
        blockNum = 0;
        gameMode = "stop";
      }
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
      gameMode: gameMode,
      ball: ball,
      blocks: blocks,
      blockNum: blockNum,
    })
  }
  ballHitObject(ball,obj){
    const x1 = obj.posX;
    const y1 = obj.posY;
    const x2 = x1 + obj.width;
    const y2 = y1 + obj.height;
    var hit = [];

    if(hitLine(ball,x1,y1,x2,y1)){
      hit.push("top");
    } 
    if(hitLine(ball,x1,y2,x2,y2)){
      hit.push("bottom");
    }
    if(hitLine(ball,x1,y1,x1,y2)){
      hit.push("left");
    }
    if(hitLine(ball,x2,y1,x2,y2)){
      hit.push("right");
    }
    return hit;
  }
  ballReflect(ball,nowX,nowY,hitDir,obj){
    if(hitDir.includes("bottom")||hitDir.includes("top")){
      ball.posY = nowY + obj.vy;
      ball.vy = -ball.vy;
      ball.vx += obj.vx/5;
      ball.vy += obj.vy/5;
    }
    if(hitDir.includes("left")||hitDir.includes("right")){
      ball.posX = nowX+obj.vx;
      ball.vx = -ball.vx;
      ball.vx += obj.vx/5;
      ball.vy += obj.vy/5;
    }
  }
  ballHitBars(ball,bars,nowX,nowY){
    bars.forEach((bar)=>{
      var hitDir = this.ballHitObject(ball,bar);
      this.ballReflect(ball,nowX,nowY,hitDir,bar);
      if(hitDir.length!==0){
        return true;
      }
    })
    return false;
  }
  ballHitBlocks(ball,blocks,nowX,nowY){
    for(var i=0;i<blocks.length;i++){
      if(!blocks[i].exist){
        continue;
      }
      const hitDir = this.ballHitObject(ball,blocks[i]);
      this.ballReflect(ball,nowX,nowY,hitDir,blocks[i]);
      if(hitDir.length!==0){
        blocks[i].exist = false;
        return true;
      }
    }
    return false;
  }
  refleshblocks(blocks){
    for(var i=0;i<blocks.length;i++){
      blocks[i].exist = true;
    }
  }
  refleshBall(ball){
    ball.posX = BALL_DEF_X;
    ball.posY = BALL_DEF_Y;
    ball.vx =  BALL_DEF_SPD_X;
    ball.vy = BALL_DEF_SPD_Y
  }
  moveBall(){
    if(this.state.gameMode !== "onGame"){
      return;
    }
    var nowX = this.state.ball.posX;
    var nowY = this.state.ball.posY;
    var vx = this.state.ball.vx;
    var vy = this.state.ball.vy;
    var nextX = nowX + vx;
    var nextY = nowY + vy;
    var blocks = this.state.blocks;
    var nextBall = this.state.ball;
    var bars = this.state.bars;
    var hit;
    var gameMode = this.state.gameMode;
    var blockNum = this.state.blockNum;

    nextBall.posX = nextX;
    nextBall.posY = nextY;
    hit = this.ballHitBlocks(nextBall,blocks,nowX,nowY);
    if(hit){
      blockNum++;
    }

    if(!hit){
      hit = this.ballHitBars(nextBall,bars,nowX,nowY);
    }

    if(!hit){
      if(nextX < MIN_X ||nextX+nextBall.rad*2 > MAX_X){
        nextBall.vx = -vx;
        gameMode="end";
      }

      if(nextY < MIN_Y ||nextY+nextBall.rad*2 > MAX_Y){
        nextBall.vy = -vy;
        gameMode="end";
      }
    }
    nextBall.posX = clampVal(nextBall.posX,MIN_X,MAX_X);
    nextBall.posY = clampVal(nextBall.posY,MIN_Y,MAX_Y);
    this.setState({
      ball: nextBall,
      blocks: blocks,
      gameMode: gameMode,
      blockNum: blockNum,
    })
  }
  moveObject(){
    this.moveBall();
    this.moveBar();
  }
  render(){
    return(
      <div id="Game-All">
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
          <p id="Game-clear"
          style={{
            display: (this.state.blockNum===BLOCK_COL*BLOCK_ROW)?
              "block":"none",
          }}
          >すごい！</p>
        </div>
        <div id="Game-desc">
          <h2>説明</h2>
          <p>ブロック崩しです。</p>
          <p>スペースキーで開始、矢印キーでバーを動かします。</p>
          <p>ただし、ボールがどの外枠に触れてもいけません。</p>
          <p>４つのバーを駆使して頑張って下さい。</p>
          <br/> <br/>
          <h2>攻略</h2>
          <p>ボールの速度を操りましょう。</p>
          <p>ボールとバーが接触した際、
          バーが動いていたらその方向にボールの速度が加算されます。</p>
          <p>なので、ボールが動いている逆の方向にバーを動かしながら
          当てると難易度が下がります。</p>
          <p>特に、x軸方向の速度は上手くやると0にできます。</p>
          <p>側面のバー、特に左バーは動かすのが難しいのでなるべく使わずにやると良いです。</p>
        </div>
      </div>
    )
  }
}
