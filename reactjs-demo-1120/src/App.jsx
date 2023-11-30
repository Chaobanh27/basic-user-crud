/* eslint-disable no-console */
import { Container } from 'react-bootstrap'
import './App.css'
import Header from './components/Header'

function App(props) {

  return (
    <>
      <Header/>
      <Container style={{ minHeight:'80vh', display: 'flex', justifyContent:'center', alignItems:'center' }}>
        {props.children}
      </Container>
    </>
  )
}

export default App
