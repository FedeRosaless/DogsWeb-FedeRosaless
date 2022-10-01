import React from "react";
import './styles.css'
export default function Paginado ({breadPerPage, allDog, paginado}){
    const pageNumber = []

    //en este arreglo se pushea cada vez que se divide allDog

    for(let i=1; i<= Math.ceil(allDog/breadPerPage); i++){
        pageNumber.push(i)
    }
    
    
    return (
        <div>
            <ul className="pagi">
                {
                    pageNumber &&
                    //si esta el arreglo lo mapeamos 
                    pageNumber.map(n=>{
                        return(
                        <li className="pag" key={n}>
                            <a onClick={()=>paginado(n)}>{n}</a>
                        </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}