import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import decamark from '../media/Spr_3r_000.png'

function Card(p) {

  const PokeImg = styled.img`
    object-fit: cover;
    width: 96px;
    height: 96px;
  `

  let {front_default, name, stats, types, Types, className} = p

  return (
    <div className={className}>
      <Link to={'/detail/'+name}>{name.charAt(0).toUpperCase() + name.slice(1)}</Link> <br />
      <PokeImg src={front_default} alt='' onError={e=>{if(e.target.src!==decamark){e.target.onerror = null; e.target.src=decamark}}}/>
      {Types? <h3>Types {Types[0]?.name} {Types[1]?.name}</h3> : <h3>Types {types[0]?.type.name} {types[1]?.type.name}</h3>}
      <h4>atk: {stats[1]?.base_stat}</h4>
    </div>
  )
}

export default Card