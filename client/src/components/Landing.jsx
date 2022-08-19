import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import trainer_red from '../media/14729.jpg'

const LanDiv = styled.div`
  background-image: url(${trainer_red});
  background-position: center;
  background-size: contain; 
  background-repeat: no-repeat;
  background-color: black;
  height: 100vh;
`;

const Ready = styled.h1`
  color: white;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -220%);
`

const Begin = styled.button`
  font-size: 24px;
  background-color: transparent;
  color: white;
  border: double white;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &:hover{
    background-color: white;
    border: double black;
    color: black;
    cursor: pointer
  }
`;

function Landing() {
  const history = useHistory()

  return (
    <LanDiv>
        <Ready>Ready to begin your Pokemon Journey?</Ready>
        <Begin onClick={()=>history.push('/home')}>Begin</Begin>
    </LanDiv>
  )
}

export default Landing