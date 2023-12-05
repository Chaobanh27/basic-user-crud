/* eslint-disable no-console */
import axios from 'axios'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import { FaEye, FaEyeSlash, FaLock, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { Container } from 'react-bootstrap'
import RenderError from '../../utils/RenderError'

function Login() {
  const [input, setInput] = useState({
    username:'',
    password:''
  })
  const [error, setError] = useState({})
  const [showPass, setShowPass] = useState(false)

  const navigate = useNavigate()

  const handleShowPass = () => {
    setShowPass(!showPass)
  }

  const handleChange = (e) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    setInput(state => ({ ...state, [inputName]:inputValue }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    let errorsSubmit = {}
    let flag = true
    if (input.username == '') {
      errorsSubmit.username = 'username is required'
      flag = false
    }
    else {
      errorsSubmit.username = ''
      flag = true
    }

    if (input.password == '') {
      errorsSubmit.password = 'password is required'
      flag = false
    }
    else {
      errorsSubmit.password = ''
      flag = true
    }

    if (flag) {
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

    else {
      setError(errorsSubmit)
    }
  }
  return (
    <>
      <Container>
        <div>
          <h3 style={{ color: 'white' }}>Login</h3>
        </div>
        <Form style={{ backgroundColor:'white', padding:'25px' }} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} lg="6" md="12" controlId="validationCustomUsername">
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
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} lg="6" md="12" controlId="validationCustomPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend"><FaLock/></InputGroup.Text>
                <Form.Control
                  type={showPass ? 'text' : 'password'}
                  placeholder="Password"
                  aria-describedby="inputGroupPrepend"
                  required
                  name='password'
                  onChange={handleChange}
                />
                <Button onClick={handleShowPass}>{showPass ? <FaEyeSlash/> : <FaEye/>}</Button>
              </InputGroup>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Check
              label="Remember me"
            />
          </Form.Group>
          <RenderError errors = {error}/>
          <Button className='mt-3' type="submit">Submit form</Button>
        </Form>
      </Container>

    </>
  )
}

export default Login