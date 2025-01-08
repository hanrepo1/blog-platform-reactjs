import React, {useContext, useEffect, useState} from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'
import DeletePost from './DeletePost'
import { UserContext } from '../context/userContext'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

const PostDetail = () => {
  const {id} = useParams()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [addComment, setAddComment] = useState('')
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState('');
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token

  const modules = {
    toolbar: [
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header', 
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`)
        setPost(response.data)
      } catch (error) {
        setError(error)
      }
      setIsLoading(false)
    }

    const getComments = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}/comments`)
        setComments(response.data)
      } catch (error) {
        setError(error)
      }
      setIsLoading(false)
    }

    getPost()
    getComments()
  }, [id])

  if (isLoading) {
    return <Loader/>
  }

  const createComment = async (e) => {
    e.preventDefault()

    const postData = new FormData()
    postData.set('userId', currentUser.id)
    postData.set('name', currentUser.name)
    postData.set('content', addComment)
    postData.set('postId', id)

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts/${id}/add-comments`, postData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      if (response.status == 201) {
        return navigate(0)
      }
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  const editComment = (commentId, content) => {
    setEditCommentId(commentId);
    setEditCommentContent(content);
  };

  const saveEditComment = async (commentId) => {
    const postData = {content: editCommentContent}

    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/comments/${commentId}`, postData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      if (response.status === 200) {
        return navigate(0)
      }
    } catch (error) {
      setError(error.response.data.message)
    }

    setEditCommentId(null);
    setEditCommentContent('');
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/comments/${commentId}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      if (response.status === 200) {
        navigate(0)
      }
    } catch (error) {
      setError("Could not delete comment.")
    }
  };

  return (
    <section className="post-detail">
      {error && <p className='form__error-message'>{error.message}</p>}
      {post && (
        <div className="container post-detail__container">
          <div className="post-detail__header">
            <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
            {currentUser?.id === post.creator && (
              <div className="post-detail__buttons">
                <Link to={`/posts/${post?._id}/edit`} className='btn sm primary'>Edit</Link>
                <DeletePost postId={id} />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <div className="post-detail__thumbnail">
            <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="Post thumbnail" />
          </div>
          <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
          {currentUser && 
          <div>
            <h2 className="title">Comments</h2>
            {comments.map(comment => (
              <div key={comment._id} className="comment">
                <div className="comment-author">{comment.name}</div>
                {editCommentId === comment._id ? (
                  <div className="edit-comment">
                    <textarea
                      value={editCommentContent}
                      onChange={(e) => setEditCommentContent(e.target.value)}
                      className="form-control"
                    />
                    <button className="btn sm primary" onClick={() => saveEditComment(comment._id)}>Save</button>
                    <button className="btn sm danger" onClick={() => setEditCommentId(null)}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <div className="comment-text" dangerouslySetInnerHTML={{ __html: comment.content }}></div>
                    <div className="comment-date">Updated at: <ReactTimeAgo date={new Date(comment.updatedAt)} locale='en-US'/></div>
                    {currentUser.id === comment.userId && (
                      <div className="comment-buttons">
                        <button className="btn sm primary" onClick={() => editComment(comment._id, comment.content)}>Edit</button>
                        <button className="btn sm danger" onClick={() => deleteComment(comment._id)}>Delete</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            <div className="add-comment">
              <h3 className="add-comment-title">Add a Comment</h3>
              <form className="form create-post_form" onSubmit={createComment}>
                <ReactQuill modules={modules} formats={formats} value={addComment} onChange={setAddComment} />
                <button type="submit" className='btn primary'>Add Comment</button>
              </form>
            </div>
          </div>
          }
        </div>
      )}
    </section>
  )
}

export default PostDetail
