import React ,{useEffect}from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { detail, resetDet} from "../../redux/actions";
import './styles.css'
import Loading from "../loading/loading";

export default function Detail () {

    const details = useSelector(s=>s.details);
    const dispatch = useDispatch()
    
    let { id } = useParams()

    useEffect(()=>{
        dispatch(detail(id))
        return()=>{
            dispatch(resetDet())
        }
    },[])


    let nameDog, imageDog, temperamentDog = [], heightDog, weightDog, lifeSpanDog;
console.log(details)
    if(details[0]){
        nameDog = details[0].name;
        imageDog = details[0].image;
        heightDog = details[0].height;
        weightDog = details[0].weight;
        lifeSpanDog = details[0].life_span;

        if (details[0].temperaments[0]) {
        temperamentDog = [...details[0].temperaments]
        console.log(temperamentDog)
    }
    
    if (details[0].temperaments[0].name) {
        temperamentDog = details[0].temperaments.map(temp => temp.name)
    }
}

    return(<div className="fondoDet" >
        <div>
            <Link to='/home'>
                <h2 className="homedet">Home</h2>
            </Link>
            <div >
                {
                    details.length?(
                    <div className="primer">
                        <div className="segundo">
                        <h1 className="nameDog">{nameDog}</h1>
                        </div>
                        <div className="detail">
                            <div className="caracts">
                        <div >
                            <h2> <span className="car"> Height:</span> <br /> {heightDog && heightDog[0]}-{heightDog && heightDog[1]} cms.</h2>
                            <h2> <span className="car"> Weight:</span> <br /> {heightDog &&  weightDog[0]}-{weightDog && weightDog[1]} kg.</h2>
                            <h2> <span className="car"> Lifespan:</span> <br /> {lifeSpanDog}.</h2>
                        </div>
                        <h2><span>
                           <span className="car"> Temperaments:</span><ul className="temps"> {temperamentDog.map(t=><li key={t}>{t+" "}</li>)}</ul>.
                            {console.log(temperamentDog)}
                        </span></h2></div>

                        <div>
                            <img className="imagen" src={imageDog}/>
                            </div>
                        </div>
                    </div>
                    ) : (
                        <div className="notf">
                            <Loading/>
                        </div>
                    )
                }
            </div>
        </div>
        </div>
    )
}