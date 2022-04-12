import React, { useEffect, useState } from "react"
import Axios from 'axios'
import { useParams, Link } from "react-router-dom"
import LoadingDotsIcon from "./LoadingDotsIcon"

function ProfileFollowers() {
  const {username} = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [isZero, setIsZero] = useState()

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/followers`, {cancelToken: ourRequest.token})
        setPosts(response.data)
        setIsLoading(false)
        setIsZero(response.data.length)
      } catch(e) {
        console.log("There was a problem or the request was canceled")
      }
    }
    fetchPosts()
    return () => {
      ourRequest.cancel()
    }
  }, [username])

  if (isLoading) return <div><LoadingDotsIcon /></div>

  if (!isZero) {
    return <div>No followers yet</div>
  }

  return (
    <div className="list-group">
      {posts.map((follower, index) => {
        return (
          <Link key={index} to={`/profile/${follower.username}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={follower.avatar}/> {follower.username}
          </Link>
        )
      })}
    </div>
  )
}

export default ProfileFollowers