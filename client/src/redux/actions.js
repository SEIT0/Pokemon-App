import axios from 'axios';

export const GET_ALL = 'GET_ALL'
export const GET_DETAIL = 'GET_DETAIL'
export const CREATE = 'CREATE'
export const GET_TYPES = 'GET_TYPES'
export const GET_SOME = 'GET_SOME'
export const CLEAR = 'CLEAR'

export const pokeUrl = 'http://localhost:3001/pokemons'
export const nameUrl = 'http://localhost:3001/pokemons?name='//+name
export const typesUrl = 'http://localhost:3001/types'

export const decamark = "https://archives.bulbagarden.net/media/upload/8/8e/Spr_3r_000.png"

export const getAll = () =>{
    return async (dispatch)=>{
        return axios.get(pokeUrl).then(r=> dispatch({type: GET_ALL, payload: r.data}))
    }
}

export const getDetail = (name) =>{
    return async (dispatch)=>{
        return axios.get(nameUrl+name).then(r=> dispatch({type: GET_DETAIL, payload: r.data}))
    }
}

export const getTypes = () =>{
    return async (dispatch)=>{
        return axios.get(typesUrl).then(r=> dispatch({type: GET_TYPES, payload: r.data}))
    }
}

export const create = (p)=>{
    return async ()=>{
        axios.post(pokeUrl, p)
        return {type: CREATE, payload: {...p}}
    }
}

export const getSome = (order, origin, type)=>{
    return dispatch=> dispatch({type: GET_SOME, payload: {order, origin, type}})
}

export const clearDetail = ()=>{
    return dispatch=> dispatch({type: CLEAR})
}