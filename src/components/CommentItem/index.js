import './index.css'

const CommentItem = props => {
  const {commentDetails, onClikeLikeBtn, onDeleteComment} = props
  const {id, name, userComment, date, initialContainerClassName, isLiked} =
    commentDetails

  const initial = name.slice(0, 1)

  const likeImgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const changeLikeImg = () => {
    onClikeLikeBtn(id)
  }

  const deleteComment = () => {
    onDeleteComment(id)
  }

  return (
    <li className="list-container">
      <div className="container-1">
        <div className={`initial-cont ${initialContainerClassName}`}>
          {initial}
        </div>
        <div className="container-2">
          <div className="container-3">
            <p className="name">{name}</p>
            <p className="date">{date}</p>
          </div>
          <p className="comment">{userComment}</p>
        </div>
      </div>
      <div className="container-4">
        <button className="like-del-btn" onClick={changeLikeImg}>
          <img className="like-img" src={likeImgUrl} alt="like" />
          Like
        </button>
        <button
          data-testid="delete"
          className="like-del-btn"
          onClick={deleteComment}
        >
          <img
            className="delete-img"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
