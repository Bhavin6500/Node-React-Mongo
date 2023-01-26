import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Typography, TextField } from '@material-ui/core'
import Button from '@mui/material/Button'
import useStyles from './styles'
import { commentPost } from '../../Redux/Actions/Posts_Actions'

export const Comments = ({ post }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const commentsRef = useRef()
  const user = JSON.parse(localStorage.getItem('profile'))
  const [comments, setComments] = useState(post?.comments)
  const [comment, setComment] = useState('')

  const handleSubmit = async () => {
    const finalComment = `${user.result.name} : ${comment}`
    const newComments = await dispatch(commentPost(finalComment, post._id))
    setComments(newComments)
    setComment('')

    commentsRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>

          {comments.map((comment, index) => (
            <Typography gutterBottom variant="subtitle1" key={index}>
              <strong>{comment.split(': ')[0]} </strong>
              {comment.split(':')[1]}
            </Typography>
          ))}

          <div ref={commentsRef} />
        </div>
        <div style={{ width: '50%' }}>
          <Typography gutterBottom variant="h6">
            Write a comment
          </Typography>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <Button
            style={{ marginTop: '10px' }}
            fullWidth
            color="primary"
            variant="contained"
            disabled={!comment}
            onClick={handleSubmit}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  )
}
