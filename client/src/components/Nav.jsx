import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

function Nav() {
  const [value, setValue] = useState()
  const history = useHistory()

  const handleChange = e =>{
    setValue(e.target.value.toLowerCase())
  }

  const handleSubmit = e =>{
    history.push('/detail/'+value)
  }

  return (
    <div>
      <Link to={'/home'}>Home</Link>{' '}
      <Link to={'/create'}>Create</Link>
      <form onSubmit={handleSubmit}>
        <input pattern={'([A-Za-z]*)|porygon2|porygon-z'} required placeholder='Pokemon name...' type="text" onChange={handleChange}/>
        <button type='submit' >Search</button>
      </form>
    </div>
  )
}

export default Nav