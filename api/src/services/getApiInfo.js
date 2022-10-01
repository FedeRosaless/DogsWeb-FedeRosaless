const { Dog , Temperaments } = require('../db')
const axios = require('axios')
const { API_KEY } = process.env;


const getApiInfo = async () =>{
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)
    
    const apiInf = await apiUrl.data.map(dato=>{
        let tempArray = []
        if(dato.temperament) tempArray=dato.temperament.split(', ')
        let heightArray = []
        if(dato.height.metric){
            heightArray = dato.height.metric.split(" - ")
        }
        let weightArray = []
        if(dato.weight.metric){
            weightArray = dato.weight.metric.split(" - ")
        }
        
        return{
            id: dato.id,
            name: dato.name,
            height: heightArray,
            weight: weightArray,
            life_span: dato.life_span,
            image: dato.image.url,
            temperaments: tempArray
        }
    })
    return apiInf;
}

const getDbInf = async ()=>{
    return await Dog.findAll({
        include:{
            model: Temperaments,
            attributes: ['name'],
            through:{
                attributes:[],
            },
        }
    })
}
const getAllDogs = async ()=>{
    let apiInf = await getApiInfo();
    let dbInf = await getDbInf();
    let total = [...apiInf,...dbInf];
    return total;
}

module.exports = {
    getAllDogs
}