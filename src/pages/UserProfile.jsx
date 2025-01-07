import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import axios from 'axios'

const UserProfile = () => {
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAvatarTouched, setIsAvatarTouched] = useState(false)

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token
  const navigate = useNavigate()

  const {id} = useParams()

  useEffect(() => {
      if (!token) {
        navigate('/')
      }
  }, [])

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      const {name, email, avatar} = response.data
      setName(name)
      setEmail(email)
      setAvatar(avatar)
    }
    getUser()
  }, [])

  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false)
    try {
      const postData = new FormData()
      postData.set('avatar', avatar)

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/change-avatar`, postData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      setAvatar(response?.data.avatar)
    } catch (error) {
      console.log(error)
    }
  }

  const updateUserDetail = async (e) => {
    e.preventDefault()

    try {
      const userData = new FormData()
      userData.set('name', name)
      userData.set('email', email)
      userData.set('currentPassword', currentPassword)
      userData.set('newPassword', newPassword)
      userData.set('confirmNewPassword', confirmNewPassword)
  
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/users/edit-user`, userData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
  
      if (response.status === 200) {
        navigate('/logout')
      }
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/${currentUser.id}`} className='btn'>My Posts</Link>

        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt="" />
            </div>
            <form className="avatar__form">
              <input type="file" name='avatar' id='avatar' onChange={e => setAvatar(e.target.files[0])} accept='png, jpg, jpeg'/>
              <label htmlFor="avatar" onClick={() => {setIsAvatarTouched(true)}}><FaEdit/></label>
            </form>
            {isAvatarTouched && <button className='profile__avatar-btn' onClick={changeAvatarHandler}><FaCheck/></button>}
          </div>

          <h1>{currentUser.name}</h1>

          <form className='form profile__form' onSubmit={updateUserDetail}>
            {error && <p className="form__error-message">{error}</p>}
            <input type="text" placeholder='Full Name' value={name} onChange={e => setName(e.target.value)} />
            <input type="text" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder='Current Password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
            <input type="password" placeholder='New Password' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <input type="password" placeholder='Confirm New Password' value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
            <button type="submit" className='btn primary'>Update Details</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile