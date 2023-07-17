// App 컴포넌트 = App 태그를 만든것


import Footer from "./Components/footers/Footer"
import Header from "./Components/headers/Header"
import Section from "./Components/sections/Section"
import './App.css';
import logo from "../logo.svg";

/*
const App = ()=>{
    const textLogo = "React!!";
    const today = new Date();
    
    return (
        <div>
             <Header logo={logo}  textlogo={textLogo} />
             <Section />
             <Footer year={today.getFullYear()}/>
        </div>
    )
}
*/

import { useState } from "react";
/*
const App = ()=>{
    const textLogo = "React!!";
    const today = new Date();
    let   num = 0; // 화면을 갱신하지 못함
    const [uiNum, setUiNum] = useState(0); // 화면을 갱신하는 함수(hook)

    setInterval(()=>{
        num++;
        console.log(num);

        //setUiNum(uiNum=>uiNum+1);
        setUiNum(uiNum+1);
    }, 3000)
    
    return (
        <div>
             <h1> hello {textLogo} </h1>

             <div>{num} {uiNum}</div>
        </div>
    )
}
*/
const App = ()=>{
    const textLogo = "React!!";
    const today = new Date();
    let   num = 0; // 화면을 갱신하지 못함
    const [uiNum, setUiNum] = useState(0); // 화면을 갱신하는 함수(hook)
    
    // document.querySelector('button').addEventListener('click',()=>{
    //     setUiNum(uiNum+1);
    // })

    return (
        <div>
             <h1> hello {textLogo} </h1>

             <div>{num} </div>
              
             <button onClick={ ()=>setUiNum(uiNum+1) }>uiNum : {uiNum}</button>
             <button onClick={ ()=>console.log('click') }>click</button>
             <button onMouseOver={ ()=>console.log('mouseover') }
                     onMouseOut={ ()=>console.log('mouseout') }    
             > 마우스오버/아웃 </button> 
        </div>
    )
}

export default  App

