/* eslint-disable no-console */
import axios from 'axios'
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import { FaEye, FaEyeSlash, FaLock, FaUser } from 'react-icons/fa'
import RenderError from '../../utils/RenderError'
import { useNavigate } from 'react-router-dom'

function SignUp() {
  const [input, setInput] = useState({
    username:'',
    password:'',
    repeat_password:''
  })

  // const str1 = '  Hello World  '
  // console.log(checkWhitespace(str1))

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
    let whiteSpaceRegex = /^\S.*\S$/
    let usernameRegex = /^[a-zA-Z0-9]+$/
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    let errorsSubmit = {}
    let flag = true
    if (input.username == '') {
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

    if (input.password == '') {
      errorsSubmit.password = 'password is required'
      flag = false
    }
    else if (!passwordRegex.test(input.password)) {
      errorsSubmit.password = 'password must have at least one lowercase letter, at least one uppercase letter, at least one digit in the string & at least one special character'
      flag = false
    }
    else if (input.password.length < 8) {
      errorsSubmit.password = 'password length must be at least 8 characters long'
      flag = false
    }
    else {
      errorsSubmit.password = ''
      flag = true
    }

    if (input.repeat_password == '') {
      errorsSubmit.confirmPassword = 'confirm password is required'
      flag = false
    }
    else if (input.repeat_password !== input.password) {
      errorsSubmit.confirmPassword = 'confirm password must be the same as password'
      flag = false
    }
    else {
      errorsSubmit.confirmPassword = ''
      flag = true
    }

    if (flag) {
      axios.post('http://localhost:3000/v1/accounts/signup', input)
        .then((res) => {
          console.log(res)
          navigate('/auth/login')
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
          <h3 style={{ color: 'white' }}>Sign Up</h3>
        </div>
        <Form style={{ backgroundColor:'white', padding:'25px' }} noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} lg="4" md="12" controlId="validationCustomUsername">
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
            <Form.Group as={Col} lg="4" md="12" controlId="validationCustomPassword">
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
            <Form.Group as={Col} lg="4" md="12" controlId="validationCustomConfirmPassword">
              <Form.Label>ConfirmPassword</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend"><FaLock/></InputGroup.Text>
                <Form.Control
                  type='password'
                  placeholder="ConfirmPassword"
                  aria-describedby="inputGroupPrepend"
                  required
                  name='repeat_password'
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <RenderError errors = {error}/>
          <Button className='mt-3' type="submit">Submit form</Button>
        </Form>
      </Container>


    </>
  )
}

export default SignUp