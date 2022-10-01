import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from '../card/index'
import { getAllDogs ,getFilterTemperament, getOrderName, getOrderWeight, getTemperant, filterCreatedDog, setCurrentPage} from "../../redux/actions";
import './styles.css'
import SearchBar from "../searchBar";
import { Link } from "react-router-dom";
import Paginado from "../paginado";
import Loading from "../loading/loading";


export default function Home (){
    const temperament = useSelector(d=>d.temperament)
    const allDog = useSelector(d=>d.dogs)
    const [ order, setOrder ] = useState("")
    const dispatch = useDispatch()

//-------------paginado------------

   // const [ currentPage , setCurrentPage ] = useState(1) //estado inicial
    const currentPage = useSelector(c=>c.currentPage)
    const [ breedPerPage, setBreedPerPage]  = useState(8) //se setea la cantidad de razas por pagina
    const indexOfLastBreed  = currentPage * breedPerPage //en un principio es 8
    const indexOfFirstBread = indexOfLastBreed - breedPerPage // 0
    const currentBreed = allDog.slice(indexOfFirstBread,indexOfLastBreed)// p:1 ------0-------8 = p2:------9------17

    const paginado = (pageNumber)=>{
        dispatch(setCurrentPage(pageNumber))
    }

    useEffect(()=>{
        dispatch(getAllDogs())
        dispatch(getTemperant())
    },[dispatch])

    const handleFilterTemperament = (e)=>{
        e.preventDefault()
        dispatch(getFilterTemperament(e.target.value))
        setCurrentPage(1)
    }

const handleOrderName=(e)=>{
    e.preventDefault()
    dispatch(getOrderName(e.target.value))
    setOrder(`Ordenado ${e.target.value}`);
    setCurrentPage(1)
}

const handleOrderWeight=(e)=>{
    e.preventDefault()
    dispatch(getOrderWeight(e.target.value))
    setOrder(`Ordenado ${e.target.value}`);
    setCurrentPage(1)
}

function handleClick(e) {
    e.preventDefault()
    dispatch(getAllDogs())
    setCurrentPage(1)
    
}

function handleFilterByCreated(e){
    e.preventDefault()
    dispatch(filterCreatedDog(e.target.value))
    setCurrentPage(1)
}

    return(
        <div className="fondo">
                <div className="heder">
                    <div className="div_flex">
                    <img className="image" src="https://img.freepik.com/free-vector/cute-labrador-dog-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated_138676-4332.jpg?w=2000"/>
                        <button className="clean" onClick={(e) => handleClick(e)}>Reload Dogs</button>
                    <SearchBar/>
                    <div className="ingraza">
                    <Link to='/dog'>Enter new breed</Link>
                    </div>
                    </div>
                    <div className="filters">
                        <div className="style_filte">

                            <select className="select" onChange={(e) => handleFilterByCreated(e)}>
                                <option defaultValue value="all_dogs">All Dogs</option>
                                <option value="dog_db">DB Dogs</option>
                            </select>

                            <select onChange={handleOrderName} className="select">
                                <option value="A-Z">Alphabetic Order</option>
                                <option value="A-Z">A-Z</option>
                                <option value="Z-A">Z-A</option>
                            </select>
                            <select onChange={handleOrderWeight} className="select">
                                <option value="">Sort by weight</option>
                                <option value="ASCENDENTE">Weight: Low to High</option>
                                <option value="DESCENDENTE">Weight: High to Low</option>
                            </select>
                            <select onChange={(e)=>handleFilterTemperament(e)} className="select">
                
                                <option defaultValue='All'>All</option>
                                {
                                    temperament?.map(e=><option value={
                                        e.name} key={e.id}>{e.name}</option>)
                                }
                            </select>
                    </div>
                    </div>
                </div>
            <div className="divHome">
                
                {currentBreed.length?
                    (currentBreed.map(e=>{
                        return(
                        <Card
                            name={e.name}
                            image={e.image}
                            temperament = {e.temperaments?.[0]?.name? e.temperaments.map(el=>el.name) : e.temperaments  }
                            key = {e.id}
                            id = {e.id}
                            />
                            
     ); })) : ( 
     //<h1>Loading... 🐶🐩</h1>
     <Loading/>
     ) 
                } 
            </div>
            <Paginado
            breadPerPage={breedPerPage}
            allDog={allDog.length}
            paginado={paginado}
            /> 
        </div> 
    )
}