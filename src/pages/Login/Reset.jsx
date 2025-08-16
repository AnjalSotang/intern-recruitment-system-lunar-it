import React from 'react'
import Form from './components/Form'
import { useParams } from 'react-router-dom'

const Reset = () => {
  const {token} = useParams()
  return (
    <Form type='reset' token={token}/>
  )
}

export default Reset
