import React, {useEffect, useState} from "react";
import {fetchStack} from "./uitlity/apiendpoints";
import styles from "./App.module.css";
import Gallary from "./components/Gallary";

function App (){
 
const [placeholder, setPlaceholder] = useState([]);// dummy array  for pages 
const [size, setSize] = useState(0);
const [list, setList] = useState([]);// dummy list for limted pages 
const [activePage, setActivePage] = useState(1);//to track active page as pe the 
const [activeIndex, setActiveIndex] = useState(0);// active index as per the list

/***IMAGES states */
const [images, setImages] = useState([]);
const [gallary, setGallary] = useState([]);
const [firedImages, setFiredImages] = useState(50);
// 1000 pages per page 50 images

const stackEvents =async()=>{
    const images = await fetchStack();
    //console.log(images)
    setImages(images)
    
}

const nextHandler =()=>{
    setSize((prevState)=>prevState-1);
    if(size <=placeholder.length){
        setActivePage((prevSate)=>prevSate+1);
    }
    if(activeIndex<list.length-1){
        setActiveIndex((prevSate)=>prevSate+1)
    }
    if(activeIndex===list.length-1 && activePage< placeholder.length){
        
        const firstElement = placeholder.findIndex((number) => number === list[0].page)+1;
        const lastElement = placeholder.findIndex((number) => number === list[list.length - 1].page)+1;
        let currentPages =[];
       
       for (let i=firstElement;i<=lastElement;i++){
          currentPages.push({
            page: placeholder[i],
          })
       }
       
        setList(currentPages);
    }
}
const prevHandler =()=>{
    setSize((prevState)=>prevState+1);
   
    if(size >=0){
        setActivePage((prevSate)=>prevSate-1);
       
    }
    if(activeIndex>=1){
        setActiveIndex((prevSate)=>prevSate-1)
    }
    if(activeIndex ===0){
        const firstElement = placeholder.findIndex((number) => number === list[0].page)-1;
        const lastElement = placeholder.findIndex((number) => number === list[list.length - 1].page)-1;
        let currentPages =[];
      
        for (let i=firstElement;i<=lastElement;i++){
           currentPages.push({
             page: placeholder[i],
           })
        }
      
         setList(currentPages);
    }
}
const clickHandler =(page, index)=>{
    setActiveIndex(index);
    setActivePage(page);
}

//SIDE EFFECTS/////
useEffect(()=>{
    stackEvents();
    const numbers = new Array(50).fill(0).map((_, i) => i + 1);
    setPlaceholder(numbers)
},[]);

useEffect(()=>{ //setting up dummy list 
    let currentPagesList =[];
   for (let i=0;i<10;i++){
      currentPagesList.push({
        page: placeholder[i],
      })
   }
    setList(currentPagesList);
    setSize(placeholder.length-1);
},[placeholder]);

useEffect(()=>{//setting page wise images 
    let currentImages =[];
    let loop=0;
    let firingIndex =firedImages;
   
    while(loop !== placeholder.length-2){
        currentImages.push(images[firingIndex]);
        loop++;
        firingIndex++;
    }
    console.log("DEBUG", firedImages)
    setGallary(currentImages);
    setFiredImages((prevSate)=>activePage*placeholder.length);
},[activePage, images]);

useEffect(()=>{
   
    setSize(placeholder.length-activePage)
   
},[activeIndex]);
return (
    <div>
        {true &&<Gallary list={gallary} activePage={activePage}/>}
    <div className={styles.pagenantion}>
        <div className={styles.container}>
            <button className={styles.navbutton} disabled={size===placeholder.length-1} onClick={prevHandler}>prev</button>
            {list.map((stack,index)=>(
                <button key={`${index} ${stack}`} className={activePage===stack.page?styles["page-button"]:""} onClick={()=>clickHandler(stack.page, index)}>{stack.page}</button>
            ))}
            <button className={styles["spread-button"]}>.....</button>
            <button>{size}</button> 
            <button className={styles.navbutton} disabled={size<1} onClick={nextHandler}>next</button>
        </div>
    </div>
    </div>
);
}
export  default App;