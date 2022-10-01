import axios from 'axios'

export function getAllDogs(){
    return async function (dispatch){
        console.log('me ejecuto')
        var json = await axios.get("http://localhost:3001/dogs")
        return dispatch ({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}


export function searchDog(payload){
     return async function (dispatch){
       try{ var json = await axios.get(`http://localhost:3001/dogs?name=${payload}`)
        return dispatch({
            type: 'SEARCH_DOG',
            payload: json.data
        })} catch(error){
         alert('Non-existent breed.')
        }
    }}



export function getTemperant(){
    return async function (dispatch){
        var json = await axios.get('http://localhost:3001/temperaments')
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload:json.data
        })
    }
}

export function getFilterTemperament(payload){
    return {
        type: 'GET_FILTER_TEMPERAMENTS',
        payload
    }
}
export function postBread(payload){
    return async function(dispatch){
       try{ var json = await axios.post("http://localhost:3001/dogs",payload)
       alert('Dog created.') 
       return json}
        
        catch(error){
           alert('Cannot create.')
        }
    }
}

export function getOrderName(payload){
    return{
        type: 'GET_ORDER_NAME',
        payload
    }
}
export function getOrderWeight(payload){
    return{
        type: 'GET_ORDER_WEIGHT',
        payload
    }
}

export function detail(id){
    return async function (dispatch){
        try{
            let json = await axios.get(`http://localhost:3001/dogs/`+id)
            console.log(json)
            return dispatch({
                type: 'DETAILS',
                payload:json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function resetDet(){
    return {
        type: 'RESET_DET'
    }
}

export function filterCreatedDog(payload){
    return {
        type: 'FILTER_CREATED_DOG',
        payload
    }
}

export function setCurrentPage(page){
    return {
      type: 'CURRENT_PAGE',
      payload: page
    }
  }
