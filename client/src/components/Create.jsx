import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Nav from './Nav'
import axios from 'axios'
import { decamark, pokeUrl } from '../redux/actions'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

function Create() {
  const CreaDiv = styled.div`
    background-image: url('https://gamersrd.com/wp-content/uploads/2016/09/cute-pokemon-wallpaper-gamersrd.jpg');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;

    color: white;
  `

  const {validTypes} = useSelector(s=>s)

  const [pkmn, setPkmn] = useState({
    name: "",
    front_default: "",
    weight: 0,
    height: 0,
    hp: 0,
    attack: 0,
    defense: 0,
    special_attack: 0,
    special_defense: 0,
    speed: 0,
    type1: "1",
    type2: "0"
  })
  const history = useHistory()

  const [errors, setErrors] = useState({x:'x'})

  const validate = (d) =>{
    let formErrors = {}
    if(typeof d.name !== 'string' || d.name.length < 4) formErrors.name = 'Name is too short'
    if(d.weight <= 0) formErrors.weight = 'Every pokémon has weight!'
    if(d.height <= 0) formErrors.height = 'Every pokémon has height!'
    if(d.hp < 1 || d.hp > 255) formErrors.hp = 'Stats must be between 1 and 255'
    if(d.attack < 1 || d.attack > 255) formErrors.attack = 'Stats must be between 1 and 255'
    if(d.defense < 1 || d.defense > 255) formErrors.defense = 'Stats must be between 1 and 255'
    if(d.special_attack < 1 || d.special_attack > 255) formErrors.special_attack = 'Stats must be between 1 and 255'
    if(d.special_defense < 1 || d.special_defense > 255) formErrors.special_defense = 'Stats must be between 1 and 255'
    if(d.speed < 1 || d.speed > 255) formErrors.speed = 'Stats must be between 1 and 255'
    if(d.type1 === d.type2) formErrors.types = 'Please fill only the first one for one typed pokemon'
    return formErrors
  }

  const handleChange = (e) =>{
    setPkmn({
      ...pkmn,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...pkmn,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    let paketito = {
      findThis: pkmn.name,
      createThis:{
        front_default:pkmn.front_default,
        weight:(pkmn.weight)*1,
        height:(pkmn.height)*1,
        stats:[
          {base_stat: (pkmn.hp)*1, stat:{name: 'hp'}},
          {base_stat: (pkmn.attack)*1, stat:{name: 'attack'}},
          {base_stat: (pkmn.defense)*1, stat:{name: 'defense'}},
          {base_stat: (pkmn.special_attack)*1, stat:{name: 'special-attack'}},
          {base_stat: (pkmn.special_defense)*1, stat:{name: 'special-defense'}},
          {base_stat: (pkmn.speed)*1, stat:{name: 'speed'}},
        ]
      },
      addThis: (pkmn.type2)*1 ? [(pkmn.type1)*1, (pkmn.type2)*1] : [(pkmn.type1)*1]
    }
    axios.post(pokeUrl, paketito)
    alert('Pokemon created!')
    history.push('/home')
  }

  return (
    <CreaDiv>
      <Nav/>
      <h2>Create your own Pokemon!</h2>
      <form onSubmit={handleSubmit}>
        <label>Name </label>
        <input type="text" name='name' value={pkmn.name} onChange={handleChange}/>
        <h5>{errors.name}</h5>

        <span>If this is not a valid image url, this will show up instead:</span>
        <img src={decamark} alt="?" /> <br />
        <label>Image </label>
        <input type="text" name='front_default' value={pkmn.front_default} onChange={handleChange}/>
        <br /> <br />
        <label>weight (in hgr) </label>
        <input type="number" name='weight' value={pkmn.weight} onChange={handleChange}/>
        <h5>{errors.weight}</h5>

        <label>height (in dm) </label>
        <input type="number" name='height' value={pkmn.height} onChange={handleChange}/>
        <h5>{errors.height}</h5>

        <label>Types: </label>
        <select name='type1' value={pkmn.type1} onChange={handleChange}>
          {validTypes.map(e=> <option value={e.id}>{e.name} </option>)}
        </select>
        <select name='type2' value={pkmn.type2} onChange={handleChange}>
          <option value="0"> </option>
          {validTypes.map(e=> <option value={e.id}>{e.name}</option>)}
        </select>
        <h5>{errors.types}</h5>

        <h4>Stats: </h4>
        <label >HP </label>
        <input type="number" name='hp' value={pkmn.hp} onChange={handleChange}/>
        <h5>{errors.hp}</h5>

        <label >Attack </label>
        <input type="number" name='attack' value={pkmn.attack} onChange={handleChange}/>
        <h5>{errors.attack}</h5>

        <label >Defense </label>
        <input type="number" name='defense' value={pkmn.defense} onChange={handleChange}/>
        <h5>{errors.defense}</h5>

        <label >Special-Attack </label>
        <input type="number" name='special_attack' value={pkmn.special_attack} onChange={handleChange}/>
        <h5>{errors.special_attack}</h5>

        <label >Special-Defense </label>
        <input type="number" name='special_defense' value={pkmn.special_defense} onChange={handleChange}/>
        <h5>{errors.special_defense}</h5>

        <label >Speed </label>
        <input type="number" name='speed' value={pkmn.speed} onChange={handleChange}/>
        <h5>{errors.speed}</h5>

        <button type='submit' disabled={JSON.stringify(errors) === '{}' ? false : true}> CREATE </button>
      </form>
        {/* <button onClick={()=> console.log(errors)}> Debug "errors" </button> */}
    </CreaDiv>
  )
}

export default Create