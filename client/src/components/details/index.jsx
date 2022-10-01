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

    return(
        <div className="fondo" >
        <div>
            <Link to='/home'>
                <h1 className="homedet">Home</h1>
            </Link>
            <div >
                {
                    details.length?(<div className="primer">
                        <div className="segundo">
                        <h1>{nameDog}</h1>
                        <div className="imagen">
                            <img src={imageDog}/>
                        </div>
                        </div>
                        <div className="detail">
                        <div >
                            <h2>Height: {heightDog && heightDog[0]}-{heightDog && heightDog[1]} cms.</h2>
                        </div>
                        <div>
                            <h2>Weight: {heightDog &&  weightDog[0]}-{weightDog && weightDog[1]} kg.</h2>
                        </div>
                        <div>
                            <h2>Lifespan: {lifeSpanDog}.</h2>
                        </div>
                        <h2><span>
                            Temperaments:<ul className="temps"> {temperamentDog.map(t=><li key={t}>{t+" "}</li>)}</ul>.
                            {console.log(temperamentDog)}
                        </span></h2>
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