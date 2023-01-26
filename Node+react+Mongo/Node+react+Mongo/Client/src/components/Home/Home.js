import React from 'react'
import { useState } from 'react'
import { Posts } from '../Posts/Posts'
import { Form } from '../Form/Form'
import { useDispatch } from 'react-redux'
import { getPostsBySearch } from '../../Redux/Actions/Posts_Actions'
import { Paginate } from '../Pagination/Paginate'
import { TextField } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'
import { useNavigate, useLocation } from 'react-router-dom'
import Button from '@mui/material/Button'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export const Home = () => {
  const [currentId, setCurrentId] = useState(null)
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const query = useQuery()
  const page = query.get('page') || 1
  const searchQuery = query.get('searchQuery')

  const handleAdd = (tag) => setTags([...tags, tag])
  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tags) => tags !== tagToDelete))
  const handleSubmit = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
      navigate(
        `/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`,
      )
    } else {
      navigate('/')
    }
  }

  return (
    <div className="container">
      <div className="appLeft">
        <div className="searchBar">
          <TextField
            name="searchMemory"
            variant="outlined"
            label="Search Memory"
            fullWidth
            value={search}
            style={{ marginBottom: 10 }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ChipInput
            value={tags}
            onAdd={handleAdd}
            onDelete={handleDelete}
            label="Search Tags"
            variant="outlined"
            fullWidth
            style={{ marginBottom: 10 }}
          />
          <Button variant="contained" onClick={handleSubmit} fullWidth>
            Submit
          </Button>
        </div>
        <div className="appForm">
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div>

        {!searchQuery && !tags.length && (
          <div className="pagination">
            <Paginate page={page} />
          </div>
        )}
      </div>

      <div className="appRight">
        <Posts setCurrentId={setCurrentId} />
      </div>
    </div>
  )
}
