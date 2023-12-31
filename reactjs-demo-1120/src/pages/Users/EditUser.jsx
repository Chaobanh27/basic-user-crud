/* eslint-disable no-console */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Container } from 'react-bootstrap'
import RenderError from '../../utils/RenderError'

function EditUser() {
  const [input, setInput] = useState({
    username: ''
  })
  const [error, setError] = useState({})
  //console.log(input)

  let params = useParams()

  useEffect(() => {
    axios.get('http://localhost:3000/v1/users/getUser/' + params.id)
      .then((res) => {
        //console.log(res)
        const userData = {
          username: res.data.username,
          _destroy: res.data._destroy
        }
        setInput(userData)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [params])

  const handleChange = (e) => {
    const inputValue = e.target.value
    const inputName = e.target.name
    setInput(state => ({ ...state, [inputName]:inputValue }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let flag = true
    let errorsSubmit = {}
    let whiteSpaceRegex = /^\S.*\S$/
    let usernameRegex = /^[a-zA-Z0-9]+$/
    if (input.username === '') {
      errorsSubmit.username = 'username is required'
      flag = false
    }
    else if (!usernameRegex.test(input.username)) {
      errorsSubmit.username = 'username must only contain alpha-numeric characters'
      flag = false
    }
    else if (input.username.length < 3 || input.username.length > 30) {
      errorsSubmit.username = 'username must be between 3 to 30 characters long'
      flag = false
    }
    else if (!whiteSpaceRegex.test(input.username)) {
      errorsSubmit.username = 'username must not have leading or trailing whitespace'
      flag = false
    }
    else {
      errorsSubmit.username = ''
      flag = true
    }

    if (flag)
    {
      axios.put(`http://localhost:3000/v1/users/updateUser/${params.id}`, input)
        .then((res) => {
          console.log(res.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    else {
      setError(errorsSubmit)
    }
  }


  return (
    <>
      <Container>
        <div>
          <h3 style={{ color: 'white' }}>Edit User</h3>
        </div>
        <Form style={{ backgroundColor:'white', padding:'25px' }} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control value={input.username} name='username' type="text" onChange={handleChange} />
          </Form.Group>
          <RenderError errors = {error} />
          <Button variant="primary" type="submit">
        Submit
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default EditUser