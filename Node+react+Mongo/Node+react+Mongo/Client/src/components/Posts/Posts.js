import React from 'react'
import { useSelector } from 'react-redux'
import './Styles.js'
import { Grid, CircularProgress } from '@material-ui/core'
import { Post } from './Post/Post'
import useStyles from './Styles'

export const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts)
  console.log(posts)
  const classes = useStyles()

  if (!posts?.length && !isLoading)
    return (
      <h2
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 4,
        }}
      >
        No posts yet !!!!
      </h2>
    )
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 4,
        marginLeft: 50,
        flexWrap: 'wrap',
      }}
    >
      {isLoading ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <Grid
          className={classes.Container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={4} md={4}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
}
