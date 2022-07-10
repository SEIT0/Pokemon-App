import { GET_ALL, GET_DETAIL, CREATE, GET_TYPES, GET_SOME, CLEAR } from "./actions";

const initialState = {
    pokemons: [],
    validPokes: [],
    pokeDetail: {},
    validTypes: []
}

const rootReducer = (state = initialState, {type, payload}) =>{
    switch(type){
        case GET_ALL: return{
            ...state,
            pokemons: payload,
            validPokes: payload
        }
        case GET_DETAIL: return{
            ...state,
            pokeDetail: payload
        }
        case CREATE: return{
            ...state,
            pokemons: [...state.pokemons, payload]
        }
        case GET_TYPES: return{
            ...state,
            validTypes: payload
        }
        case CLEAR: return{
          ...state,
          pokeDetail: {}
        }
        case GET_SOME: 
            let {order, origin, type} = payload
            let typeFiltered = type === 'all' ? state.pokemons : state.pokemons.filter(e=> e.Types ? e.Types[0]?.name === type || e.Types[1]?.name === type : e.types[0]?.type.name === type || e.types[1]?.type.name === type)
            let originFiltered = []
            switch (origin) {
                case 'Allpkmn': originFiltered = state.pokemons; break;
                case 'APIpkmn': originFiltered = state.pokemons.filter(e=> typeof e.id == 'number'); break;
                case 'DBpkmn' : originFiltered = state.pokemons.filter(e=> typeof e.id != 'number'); break;
                default: break;
            }
            let bothFiltered = originFiltered.filter(o1 => typeFiltered.some(o2 => o1.id === o2.id))

            switch(order){
              case 'az':
                bothFiltered.sort((a,b)=>{
                  if(a.name < b.name) return -1
                  if(a.name > b.name) return 1
                  return 0
                }); break;
              case 'za':
                bothFiltered.sort((a,b)=>{
                  if(a.name < b.name) return 1
                  if(a.name > b.name) return -1
                  return 0
                }); break;
              case '-atk': bothFiltered.sort((a,b)=> a.stats[1]?.base_stat - b.stats[1]?.base_stat); break;
              case '+atk': bothFiltered.sort((a,b)=> b.stats[1]?.base_stat - a.stats[1]?.base_stat); break;
              case 'DB': bothFiltered.reverse(); break;
              default: break;
            }
          return{
            ...state,
            validPokes: bothFiltered
        }
        default: return state
    }
}

export default rootReducer;