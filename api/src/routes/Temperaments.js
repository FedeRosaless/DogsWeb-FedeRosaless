const { Router } = require('express')
const router = Router();
const axios = require('axios')
const { API_KEY } = process.env;
const { Dog , Temperaments } = require ('../db')
require('dotenv').config();


router.get('/',async (req,res)=>{
    let dogTotal = await axios.get(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`)
    try{
        let totTemp = dogTotal.data.map(t=>t.temperament)

        totTemp = totTemp.toString().split(",")
        for(let i = 0; i<totTemp.length;i++){
            totTemp[i]
            ?
            Temperaments.findOrCreate({
                        where:{name:totTemp[i].trim()}
                    })
            :
            Temperaments.findOrCreate({
                where:{name:totTemp[i]=''}
            })
        }
        totTemp = await Temperaments.findAll()
        res.status(200).send(totTemp)
    }catch(error){
        res.status(400).send(error)
    }
})


module.exports = router;