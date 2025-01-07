import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import axios from 'axios'
import Loader from '../components/Loader'

const DeletePost = ({postId: id}) => {
  const [isLoading, setIsLoading] = useState(false)

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [])

  const removePost = async () => {
    setIsLoading(true)
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      if (response.status === 200) {
        if (location.pathname == `/myposts/${currentUser.id}`) {
          navigate(0)
        } else {
          navigate('/')
        }
      }
    } catch (error) {
      console.log("Could not delete post.")
    }
    setIsLoading(false)
  }

  if (isLoading) {
    return <Loader/>
  }

  return (
    <Link className='btn sm danger' onClick={() => removePost(id)}>Delete</Link>
  )
}

export default DeletePost