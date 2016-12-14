import React from 'react'

const UserLink = ({username, className}) => {
  let userLink = username ? <div className={className}>{username}</div> : null
  return (userLink)
}

export default UserLink
