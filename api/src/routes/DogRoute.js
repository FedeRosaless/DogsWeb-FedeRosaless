const { Router } = require('express')
const router = Router();
const { getAllDogs } = require('../services/getApiInfo.js')
const { Dog , Temperaments } = require ('../db')
require('dotenv').config();



router.get('/', async (req, res) => {
    const { name } = req.query;
    try{
        let dogTotal = await getAllDogs();
        if(name) {
            let dogName = await dogTotal.filter(e => e.name.
                toLowerCase().includes(name.toLowerCase()));
            dogName.length ? 
            res.status(200).send(dogName):
            res.status(404).send('There is not a dog with that name');
        } else {
            res.status(200).send(dogTotal)
        }
    } catch(error){
        console.log(error);
    }
});



router.get('/:idRaza', async (req, res) => {
    const idRaza = req.params.idRaza;
    try {
        let dogsTotal = await getAllDogs();
        if(idRaza){
            let dogId = await dogsTotal.filter(e => e.id == idRaza);
            dogId.length ? 
                res.status(200).json(dogId) :
                res.status(404).send('There is not a dog with that id')
        } else {
            res.status(200).send(dogsTotal)
        }
    } catch(error){
        console.log(error);
    }
})

router.post('/',async (req, res)=>{
   try{ let {
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        life_span,
        image,
        temperaments,
        createdInBd
        } = req.body
    
    const totHeight = []
    totHeight.push(min_height,max_height)

    const totWeight = []
    totWeight.push(min_weight,max_weight)

    let dog = await Dog.create({
        name,
        height:totHeight,
        weight: totWeight,
        life_span,
        image: image || "http://www.cuentoscortos.com/imagenes/935.jpg",
        createdInBd
    })
    let associatedTemp = await Temperaments.findAll({
        where:{name:temperaments},
    })

    dog.addTemperaments(associatedTemp);
    res.status(200).send("create breed")
}  catch(error){
    res.status(404).send('Error')
}
})


module.exports = router;