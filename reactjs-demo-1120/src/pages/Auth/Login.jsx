/* eslint-disable no-console */
import axios from 'axios'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

function Login() {
  const [input, setInput] = useState({
    username:'',
    password:''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    setInput(state => ({ ...state, [inputName]:inputValue }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    axios.post('http://localhost:3000/v1/accounts/login', input)
      .then((res) => {
        //console.log(res)
        let decodes = jwtDecode(res.data.token)
        let userData = decodes
        let userDataJson = JSON.stringify(userData)
        localStorage.setItem('UserData', userDataJson)
        let temp = true
        localStorage.setItem('temp', temp)
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <>
      <Form style={{ backgroundColor:'white', padding:'25px' }} noValidate onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend"><FaUser/></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
                name='username'
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
              Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend"><FaUser/></InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Password"
                aria-describedby="inputGroupPrepend"
                required
                name='password'
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
              Password is required.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            label="Remember me"
          />
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form>
    </>
  )
}

export default Login