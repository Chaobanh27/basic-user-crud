/* eslint-disable no-console */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

function UserDetail() {
  const [data, setData] = useState({})
  let params = useParams()

  useEffect(() => {
    axios.get('http://localhost:3000/v1/users/getUser/' + params.id)
      .then((res) => {
        //console.log(res)
        setData(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [params])


  const renderData = () => {
    if (Object.keys(data).length > 0) {
      return (
        <>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://i.pravatar.cc/1000" />
            <Card.Body>
              <Card.Title>
                User Info
              </Card.Title>
              <Card.Text>
                <p>Id : {data._id}</p>
                <p>Username : {data.username}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </>
      )
    }
  }

  return (
    <>
      {renderData()}
    </>
  )
}

export default UserDetail