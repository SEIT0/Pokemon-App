import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { clearDetail, getDetail } from '../redux/actions'
import decamark from '../media/Spr_3r_000.png'
import Nav from './Nav'
import errorImg from '../media/DEUt.gif'
import loadImg from '../media/loading.45600eb9.gif'

const DivErr = styled.div`
  background-image: url(${errorImg});
  height: 100vh;
  background-repeat: no-repeat;
  background-position: 0px -17rem;
  background-size: cover;
  font-size: 3rem;
  display: grid;
  grid-template-columns: auto auto auto auto;
`

const Divtail = styled.div`
  background-color: lightcyan;
`

function Detail() {
  let {name} = useParams()
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getDetail(name))
    return ()=> dispatch(clearDetail())
  }, [dispatch, name])
  const pokeDetail = useSelector(s=> s.pokeDetail)
  const { front_default, id, stats, weight, height, types, Types } = pokeDetail


  return (
    <>{
      stats?
    <Divtail>
      <Nav/>
      <h1>{name.charAt(0).toUpperCase() + name.slice(1)} ID no.{id}</h1>
      <img src={front_default} alt='' onError={e=>{if(e.target.src!==decamark){e.target.onerror = null; e.target.src=decamark}}} />
      {Types? <h3>Types {Types[0]?.name} {Types[1]?.name}</h3> : <h3>Types {types[0]?.type.name} {types[1]?.type.name}</h3>}
      <h3>Stats: </h3>
      {stats.map(e=> <h4 key={e.stat.name}>{e.stat.name}: {e.base_stat}</h4>)}
      <h5>{`height (in dm): ${height}`}</h5>
      <h5>{`weight (in hgr): ${weight}`}</h5>
    </Divtail>
    : pokeDetail === 'F' ? (<DivErr>
    <span>Pokemon not found</span> <br />
    <Link to='/home'>Return home</Link>
    </DivErr>)
    : (<>
      <h1>Loading...</h1>
      <img src={loadImg} alt="" />
      </>)
    }
    </>
  )
}

export default Detail