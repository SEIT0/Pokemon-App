import React, { useEffect, useState } from 'react'
import Card from './card'
import Nav from './Nav'
import {useDispatch, useSelector} from 'react-redux'
import { getAll, getSome, getTypes } from '../redux/actions'
import styled from 'styled-components'

const Hdiv = styled.div`
  background-color: lightgray;

`

const Scard = styled(Card)`
  width: 15rem;
  height: 13rem;
  border: 3px solid black;
  margin: 1.5rem;
`

const ScardS = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
`

const PageBtn = styled.button`
  &:hover{
    background-color: #a1a100;
  }
  background-color: ${props => props.selected ? 'yellow' : 'ghostwhite'};
`

function Home() {

  const dispatch = useDispatch()
  let {pokemons, validTypes, validPokes} = useSelector(s=> s)

  const [origin, setOrigin] = useState('Allpkmn')
  const [type, setType] = useState('all')
  const [order, setOrder] = useState('')
  const [page, setPage] = useState(1)
  
  useEffect(()=>dispatch(getTypes()), [dispatch])
  useEffect(()=>dispatch(getAll()), [dispatch])
  useEffect(()=>dispatch(getSome(order, origin, type)), [dispatch, order, origin, type])

  let lastValidPage = Math.ceil(validPokes.length / 12)
  
  const handleOrder = (value) =>{
    setOrder(o=> value)
    setPage(p=>1)
  }

  const handleOFilter = (value)=>{
    setOrigin(o=> value)
    setPage(p=>1)
  }

  const handleTFilter = (value) =>{
    setType(t=> value)
    setPage(p=>1)
  }

  const renderizeCards= ()=>{
    let renderized = []
    for (let i = (page-1)*12; i < page*12; i++) {
      let e = validPokes[i]
      if(e) renderized.push(<Scard key={e.id} stats={e.stats} front_default={e.front_default} name={e.name} types={e.types} Types={e.Types}/>)
    }
    return renderized
  }

  const pagesNavigation = () =>{
    let r = []
    if(page !== 1) r.push(<button onClick={()=>setPage(p=>p-1)}>{'<'}</button>); else r.push(<button>{'<'}</button>)
    for(let i = 1; i<=lastValidPage ; i++){
      r.push(<PageBtn selected={page === i ? true : false} onClick={()=>setPage(p=>i)}>{i}</PageBtn>)
    }
    if(page !== lastValidPage) r.push(<button onClick={()=>setPage(p=>p+1)}>{'>'}</button>); else r.push(<button>{'>'}</button>)
    return r
  }

  return (<>{
    pokemons.length ?
    <Hdiv>
      <Nav/>
      <label>Origin: </label>
      <select onChange={e=> handleOFilter(e.target.value)}>
        <option value="Allpkmn">all pokemons</option>
        <option value="APIpkmn">pokemons from api</option>
        <option value="DBpkmn">created pokemons</option>
      </select>

      <label> Type: </label>
      <select onChange={e=> handleTFilter(e.target.value)}>
        <option value="all">all types</option>
        {validTypes.map(e=> <option value={e.name}>{e.name}</option>)}
      </select>

      <label> Order: </label>
      <select onChange={e=> handleOrder(e.target.value)}>
        <option value=""> API first </option>
        <option value="DB"> DB first </option>
        <option value="az"> A - Z </option>
        <option value="za"> Z - A </option>
        <option value="-atk"> Menor Atk </option>
        <option value="+atk"> Mayor Atk </option>
      </select>

      <h2>Welcome to the world of Pokemon!</h2>
      {validPokes.length?<>
      {pagesNavigation()}
      <ScardS>{renderizeCards()}</ScardS>
      <br /> {pagesNavigation()}
      </>:<h4>No Match!</h4>}
    </Hdiv>
    : (<>
    <h1>Loading...</h1>
    <img src="https://weichiachang.github.io/pokemon-master/img/loading.45600eb9.gif" alt="" />
    </>)
}</>)
}
export default Home