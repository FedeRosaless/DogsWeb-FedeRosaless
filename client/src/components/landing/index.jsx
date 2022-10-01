import React from "react"
import { Link } from "react-router-dom"
import './styles.css'
export default function LandingPage(){
    return (
        <div className="fondo2">
            <div className="conten">
                <div>
                <h1 className='h1'>Dogs Web. Enjoy!</h1>
                <Link to='/home' >
                <button className="btnland"> <span>Find your Dog!</span> </button>
                </Link>
                </div>
            </div>
        </div>
    )
}