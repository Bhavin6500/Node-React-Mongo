import React, { useEffect } from 'react'
import { TextField } from '@material-ui/core'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import './Form.css'
import { useState } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../Redux/Actions/Posts_Actions'
import ChipInput from 'material-ui-chip-input';


export const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null,
  )
  const [data, setData] = useState({
    title: '',
    message: '',
    tags: [],
    selectedFiles: '',
  })
  let name, value
  const handleChange = (e) => {
    name = e.target.name
    value = e.target.value

    setData({ ...data, [name]: value })
  }

  useEffect(() => {
    if (post) setData(post)
  }, [post])
  const handleAddChip = (tag) => {
    setData({ ...data, tags: [...data.tags, tag] })
  }

  const handleDeleteChip = (chipToDelete) => {
    setData({
      ...data,
      tags: data.tags.filter((tag) => tag !== chipToDelete),
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if (currentId) {
      dispatch(updatePost(currentId, { ...data, name: user?.result?.name }))
    } else {
      dispatch(createPost({ ...data, name: user?.result?.name }))
    }
    handleClear()
    window.location.reload()
  }
  const handleClear = () => {
    setCurrentId(null)
    setData({
      title: '',
      message: '',
      tags: '',
      selectedFiles: '',
    })
  }

  return (
    <>
      <div className="form">
        <div className="formCard">
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            {currentId ? <h2>Edit Memory</h2> : <h2>Create a Memory</h2>}

            <TextField
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              value={data.title}
              style={{ marginBottom: 10 }}
              onChange={handleChange}
            />
            <TextField
              name="message"
              variant="outlined"
              label="Message"
              fullWidth
              multiline
              rows={4}
              value={data.message}
              style={{ marginBottom: 10 }}
              onChange={handleChange}
            />
            {/* <TextField
              name="tags"
              variant="outlined"
              label="Tags (coma separated)"
              fullWidth
              value={data.tags}
              style={{ marginBottom: 10 }}
              onChange={handleChange}
            /> */}
            <ChipInput
              name="tags"
              variant="outlined"
              label="Tags"
              fullWidth
              value={data.tags}
              style={{ marginBottom: 10 }}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip) => handleDeleteChip(chip)}
            />

            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setData({ ...data, selectedFiles: base64 })
              }
            />
            <Stack
              spacing={2}
              direction="row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}
            >
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
              <Button variant="outlined" onClick={handleClear}>
                Clear
              </Button>
            </Stack>
          </form>
        </div>
      </div>
    </>
  )
}
