import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link, useNavigate } from 'react-router-dom'

function Header() {

  let tempGetCheck = localStorage.getItem('temp')
  let tempGet
  if (tempGetCheck !== null) {
    tempGet = JSON.parse(tempGetCheck)
  }
  const navigate = useNavigate()
  const login = () => {
    let htmlEl

    if (tempGet) {
      htmlEl = (
        <>
          <Nav.Link as={Link} to="/user/index"><strong>Users</strong></Nav.Link>
          <Nav.Link as={Link} onClick={logout} to="/auth/login"><strong>Logout</strong></Nav.Link>
        </>
      )
    }
    else {
      htmlEl = (
        <>
          <Nav.Link as={Link} to="/auth/signup"><strong>SignUp</strong></Nav.Link>
          <Nav.Link as={Link} to="/auth/login"><strong>Login</strong></Nav.Link>
        </>
      )
    }
    return htmlEl
  }

  const logout = () => {
    localStorage.removeItem('temp')
    navigate('/auth/login')
  }
  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand as={Link} to="/"><strong>Logo</strong></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                      Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link as={Link} to="/"><strong>Home</strong></Nav.Link>

                  {login()}
                  <NavDropdown
                    title={<strong>List</strong>}
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item>Something</NavDropdown.Item>
                    <NavDropdown.Item>
                       Something else
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                          Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link as={Link} to="/"><strong>About</strong></Nav.Link>
                  <Nav.Link as={Link} to="/"><strong>Contact</strong></Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  )
}

export default Header