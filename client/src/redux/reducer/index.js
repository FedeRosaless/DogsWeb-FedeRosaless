const inicialState = {
    allDogs : [],
    dogs : [],
    temperament:[],
    details:[],
    currentPage: 1
}

export default function rootReducer (state = inicialState, action){
    switch(action.type){

        case 'GET_DOGS':
            console.log('me ejecuto')
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }

         case "SEARCH_DOG":
                  return {
                    ...state,
                    dogs: action.payload,
                }

        case 'GET_TEMPERAMENTS':
            const filte = action.payload.filter(t=>t.name!=="")
            return {
                ...state,
                temperament:filte
            }
        case 'GET_FILTER_TEMPERAMENTS':
            const allDogs = state.dogs;
            let dogsFilter = [];
            if(action.payload==='All') dogsFilter = state.allDogs;
            else{
                // console.log(allDogs)
                for(let i= 0;i<allDogs.length;i++){
                    let found = allDogs[i].temperaments.find((t) => t === action.payload || t.name === action.payload); //para la raza ingresada
                    if (found) {
                        dogsFilter.push(allDogs[i]);
                    }
                }
            }
            
            // console.log(allDogs)
            return{
                ...state,
                dogs:dogsFilter
            }  
            
            case 'RESET_DET':
                return {
                    ...state,
                    details: []
                }
                
        case 'GET_ORDER_NAME':
            let totalDogs =
            action.payload === 'A-Z' 
            ? state.dogs.sort((a,b)=>{
                if(a.name.toLowerCase()>b.name.toLowerCase()) return 1
                if(a.name.toLowerCase()<b.name.toLowerCase()) return -1
                return 0
            })
            : state.dogs.sort((a,b)=>{
                if(a.name.toLowerCase()>b.name.toLowerCase()) return -1
                if(a.name.toLowerCase()<b.name.toLowerCase()) return 1
                return 0
            })
            return{
                ...state,
                dogs:totalDogs
            }
        case 'GET_ORDER_WEIGHT':
            let totalDog = 
            action.payload === "ASCENDENTE"
            ? state.dogs.sort((a,b)=>{
                if(parseInt(a.weight[1])>parseInt(b.weight[1])) return 1
                if(parseInt(a.weight[1])<parseInt(b.weight[1])) return -1
                return 0
            })
            : state.dogs.sort((a,b)=>{
                if(parseInt(a.weight[1])>parseInt(b.weight[1])) return -1
                if(parseInt(a.weight[1])<parseInt(b.weight[1])) return 1
                return 0
            })
            return {
                ...state,
                dogs: totalDog
            }

            case 'DETAILS':
                let detail = action.payload;
                if(!detail[0].temperaments[0]){//agregamos "no-temperaments" a arreglos sin elementos dentro
                    detail[0].temperament[0] = 'No-temperaments'
                }
                return{
                    ...state,
                    details:detail
                }
            
            case 'FILTER_CREATED_DOG':
                let db = state.dogs.filter(e => e.createdInBd)
                let api = state.dogs.filter(e => !e.createdInDb);
            if (action.payload === 'dog_db'){
                if(!db.length){
                    alert('There is not dogs created yet');
                    return {
                        ...state,
                        dogs: state.dogs
                    }
                } else {
                    return {
                        ...state,
                        dogs: db
                    }
                }
            }
            return {
                ...state,
                dogs: action.payload === 'all_dogs' ? state.allDogs : api,
            }

            case 'CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload
            }

        default : return state
    }
}