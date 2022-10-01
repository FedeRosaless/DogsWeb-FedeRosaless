import React , { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { searchDog, setCurrentPage, getAllDogs } from "../../redux/actions";
import './styles.css'



export default function SearchBar(){
    const dispatch = useDispatch()
    const [input, setInput] = useState("")


    const handleChange = (e)=>{
        e.preventDefault()
        setInput(e.target.value)
    }
    // const handleSubmit =(e)=>{
    //     e.preventDefault()
    //     dispatch(setCurrentPage(1))
    //     dispatch(searchDog(input))
    //     setInput('')
    // }

    function handleSubmit(e){
        e.preventDefault();
        if(input.length === 0){
            return alert('Enter a breed.')
        }else{
            dispatch(setCurrentPage(1))
            dispatch(searchDog(input));
            setInput('');
        }
    };

    return( 
        <div>
            <div className="searchbar">
                <input type="text" placeholder="🔍Breed..." value={input} onChange={(e) => handleChange(e)} className="inp"/>
                <button type="submit" onClick={(e) => handleSubmit(e)}
                 className="btnsearch">Search</button>
            </div>
        </div>
    )
}