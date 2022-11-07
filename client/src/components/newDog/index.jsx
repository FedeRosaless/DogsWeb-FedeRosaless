import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperant, postBread } from "../../redux/actions";
import { Link } from "react-router-dom";
import './styles.css'

export default function NewDog (){

    const dispatch = useDispatch()
    const temperaments = useSelector(t=>t.temperament);
    const [form, setForm] = useState({
        name:"",
        min_height:"",
        max_height:"",
        min_weight:"",
        max_weight:"",
        life_span:"",
        image:"",
        temperaments: []
    })
//------------------------------

    const [error, setError] = useState({});
    const validations = function(form){
        const error = {}
        if(!form.name){
            error.name = '(Name is required)';
        }
        else if(!/^[a-zA-Z\s]*$/.test(form.name)) {
            error.name = "(Must contain letters and spaces only)";
        }
        if(!(/^[0-9][0-9]*$/.test(form.min_height))){
            error.min_height = '(Height Min must be a number)'
        }
        if(!(/^[0-9][0-9]*$/.test(form.max_height))){
            error.max_height = '(Height Max must be a number)'
        }
        if(!(/^[0-9][0-9]*$/.test(form.max_weight))){
            error.max_weight = '(Weight Max must be a number)'
        }
        if(!(/^[0-9][0-9]*$/.test(form.min_weight))){
            error.min_weight = '(Weight Min must be a number)'
        }
        if(!form.min_height){
            error.min_height = '(Height Min is required)';
        }
        if(!form.max_height){
            error.max_height = '(Height Max is required)';
        }
        if(!form.min_weight){
            error.min_weight = '(Weight Min is required)';
        }
        if(!form.max_weight){
            error.max_weight = '(Weight Max is required)';
        }
        if(form.min_height <= 0){
            error.min_height = '(Height Min must be greater than 0)';
        }
        if(form.min_height > form.max_height){
            error.min_height = '(Height Min cannot be greater than Height Max)';
        }
        if(form.max_height <= 0){
            error.max_height = '(Height Max must be greater than 0)';
        }
        if(form.min_weight <= 0){
            error.min_weight = '(Weight Min must be greater than 0)';
        }
        if(form.min_weight > form.max_weight){
            error.min_weight = '(Weight Min cannot be greater than Weight Max)';
        }
        if(form.max_weight <= 0){
            error.max_weight = '(Weight Max must be greater than 0)';
        }
        if(!(/^[0-9][0-9]*$/.test(form.life_span))){
            error.life_span = '(Life Span must be a number)'
        }
        if(form.life_span <= 0){
            error.life_span = '(Must be greater than 0)';
        }

         return error;
    }
   
//------------------------------

    const handleChange = (e)=>{
        setForm(()=>{
            const newInput = {
                ...form,
                [e.target.name] : e.target.value
            }
        const error = validations(newInput);  
        setError(error);
        return newInput; 
        })   
    }
//------------------------------
function handleDelete(e){
    setForm({
        ...form,
        temperaments: form.temperaments.filter((c) => c !== e)
    })
}

//------------------------------
    const handleSelect = (e)=>{
        if(form.temperaments.length === 6){
            setError({temperaments:'Max 6 temperaments'})
        } else {
        setForm({
            ...form,
            temperaments: [...form.temperaments,e.target.value]
        })}
    }
//------------------------------

    function handleForm(e) {
        e.preventDefault() //no pierdo los datos
        if(!form.name || !form.min_height || !form.max_height || !form.min_height || !form.min_weight || !form.max_height || !form.temperaments || !form.life_span || temperaments.length === 0){
    
        alert('Complete all form')
    
        }else if(Object.keys(error).length>0){
    
          alert("Don't create a dog with errors")
    
       }else{
        dispatch(postBread(form))
         setForm({
             name:"",
             min_height:"",
             min_weight:"",
             max_height:"",
             max_weight:"",
             life_span:"",
             image:"",
             temperaments:[]
         })
       } 
      }
//------------------------------
useEffect(()=>{
        dispatch(getTemperant())
    },[dispatch])

    return (
        <div className="fondoNewDog">
            <Link to='/home' ><h1 className="lin">Home</h1></Link>
            
            <div className="divForm">
            <form id='form' onSubmit={handleForm}>
                <h2 className="h3">New Breed:</h2>
                
                <div className="errS"><input type="text" name='name' value={form.name} onChange={handleChange} placeholder='name' className="inpcrear" />
                {error.name && <p className="exp">{error.name}</p>}</div>
                <div className="errS"><input type="number" name="min_height" value={form.min_height} onChange={handleChange} placeholder='min-heigth' className="inpcrear"/><p className="exp">Cm.</p>
                {error.min_height && <p className="exp">{error.min_height}</p>}</div>
                <div className="errS"><input type="number" name="max_height" value={form.max_height} onChange={handleChange} placeholder='max-heigth' className="inpcrear"/><p className="exp">Cm.</p>
                {error.max_height && <p className="exp">{error.max_height}</p>}</div>
                <div className="errS"><input type="number" name="min_weight" value={form.min_weight} onChange={handleChange} placeholder='min-weigth' className="inpcrear"/><p className="exp">Kg.</p>
                {error.min_weight && <p className="exp">{error.min_weight}</p>}</div>
                <div className="errS"><input type="number" name="max_weight" value={form.max_weight} onChange={handleChange} placeholder='max-weigth' className="inpcrear"/><p className="exp">Kg.</p>
                {error.max_weight && <p className="exp">{error.max_weight}</p>}</div>
                <div className="errS"><input type="number" name="life_span" value={form.life_span} onChange={handleChange} placeholder='life_span' className="inpcrear"/><p className="exp">Years.</p>
                {error.life_span && <p className="exp">{error.life_span}</p>}</div>
                <input type="text" name="image" value={form.image} onChange={handleChange} placeholder='image url' className="inpcrear"/>

                <select onChange={handleSelect} className="inpcrear">
                    <option selected>temperaments</option>

                    {temperaments.filter((f) => !form.temperaments.includes(f.name)).map((e) => (
                        <option defaultValue={
                            e.name} key={e.name+Math.random()}>{e.name}</option>
                    ))}
                </select>

                {/* <ul className="ul"><li>{form.temperaments.map(e=>e+" ,")}</li></ul> */}

                {error.temperaments && <p className="exp">{error.temperaments}</p>}

                <button type="submit" form="form">Create Breed</button>
                </form>
                <ul className="botonT">
                {form.temperaments.map((c) => (
                  <div className="delT">
                    <button className="botonTemp"
                        onClick={() => {
                            handleDelete(c)
                        }}> X </button>
                  <li><p>{c}</p>
                    </li></div>
                ))}</ul>


                

            </div>
        </div>
    )
}