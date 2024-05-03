import React, { Fragment } from "react";
import styles from "../App.module.css"

function Gallary( {list, activePage}){

    return (
        <Fragment>
        <h6 className={styles.pager}>Page No: {activePage}</h6>
       
        <div className={styles.gallary}>
        
        {list.map((stack,index)=>(<img src={activePage%2===0?stack.url:stack.thumbnailUrl} key={index}/>))}
        </div>
        </Fragment>
    );

}
export default Gallary;