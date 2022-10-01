import React from "react";
import { Link } from "react-router-dom";
import './styles.css'

export default function Card ({name,image,temperament,id}){
    return(
        <div className="divCard">
            <h3>{name}</h3>
            <img src={image} alt={name}/>
            {
                temperament.map(tem=><span key={tem+Math.random}>{tem}</span>)
            }
            <Link to={`/details/${id}`} className='a'>Details</Link>
        </div>
    )
}