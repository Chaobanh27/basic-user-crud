/* eslint-disable no-console */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { MdAdd, MdEdit, MdInfo, MdDelete } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../utils/loader'
import Modal from 'react-bootstrap/Modal'
function Index() {
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  const [getUserId, setUserid] = useState('')

  const navigate = useNavigate()

  const dataCopy = [...data]
  //console.log(dataCopy)

  useEffect(() => {
    axios.get('http://localhost:3000/v1/users/getAllUser')
      .then((res) => {
        //console.log(res)
        setData(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleClose = () => setShow(false)
  const handleShow = (userId) => {
    setShow(true)
    setUserid(userId)
  }

  const renderData = () => {
    if (data.length > 0) {
      return data.map((value) => {
        //console.log(value._destroy)
        if (value._destroy == false) {
          return (
            <tr key={value._id}>
              <td>{value._id}</td>
              <td>{value.username}</td>
              <td className="d-flex gap-2">
                <Link to={'/user/edit/' + value._id}><MdEdit/></Link>
                <Link to={'/user/detail/' + value._id} ><MdInfo/></Link>
                <Link id={value._id} onClick={() => handleShow(value._id)}><MdDelete/></Link>
              </td>
            </tr>

          )
        }

      })
    }
    else {
      return (
        <tr>
          <td></td>
          <td><Loader/></td>
          <td></td>
        </tr>
      )
    }
  }

  const handleAdd = () => {
    navigate('/user/create')
  }

  const handleDelete = (id) => {
    console.log(id)
    if (id !== '') {
      axios.put(`http://localhost:3000/v1/users/updateUser/${id}`, { _destroy : true })
        .then((res) => {
          console.log(res)
          const updatedUser = res.data
          const updatedUserIndex = dataCopy.findIndex(user => user._id === updatedUser._id)
          if (updatedUserIndex !== -1) {
            dataCopy[updatedUserIndex] = updatedUser
            setData(dataCopy)
            setShow(false)
          }

        })
        .catch((error) => {
          console.log(error)
        })
    }
  }


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><strong>Warning !</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete this user ? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDelete(getUserId)}>
            Delele
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom: '15px' }}>
          <h3 style={{ color: 'white' }}>List Users</h3>
          <Button variant='light' onClick={handleAdd}><MdAdd/></Button>
        </div>
        <Table hover>
          <thead >
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {renderData()}
          </tbody>
        </Table>
      </Container>

    </>
  )
}

export default Index