/* eslint-disable no-console */
import axios from 'axios'
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import { FaUser } from 'react-icons/fa'

function CreateUser() {
  const [input, setInput] = useState({
    username:'',
    password:'',
    repeat_password:''
  })

  const handleChange = (e) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    setInput(state => ({ ...state, [inputName]:inputValue }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    axios.post('http://localhost:3000/v1/users/addUser', input)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <>
      <Container>
        <div>
          <h3 style={{ color: 'white' }}>Create User</h3>
        </div>
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
            <Form.Group as={Col} md="4" controlId="validationCustomConfirmPassword">
              <Form.Label>ConfirmPassword</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend"><FaUser/></InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="ConfirmPassword"
                  aria-describedby="inputGroupPrepend"
                  required
                  name='repeat_password'
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
              Confirm Password is required.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </Container >
    </>
  )
}

export default CreateUser