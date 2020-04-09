import React from 'react';
import './header.css'
export default class Heads extends React.Component{
  render(){
    return(
      <div class="site-Header" style={style.siteHeader}>
        <div id="my-name" style={style.myName}>shop_one</div>
      </div>
    )
  }
}
const style = {
  siteHeader:{
    background: "#000000",
  },
  myName:{
    color: "#000000",
  }
}
