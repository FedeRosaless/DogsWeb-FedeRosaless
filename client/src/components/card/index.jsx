import React from "react";
import { Link } from "react-router-dom";
import './styles.css'

export default function Card ({name,image,temperament,id}){
    const temper = temperament.map(tem=><span key={tem+Math.random}>{tem}</span>)
    return(
        <div className="divCard">
            <h3 className="name">{name}</h3>
            <img src={image} alt={name}/>
           <span className="tcards">Temperaments:</span>
            {temper.slice(0, 3)}
            <Link to={`/details/${id}`} className='a'>More</Link>
        </div>
    )
}