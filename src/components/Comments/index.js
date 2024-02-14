import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {formatDistanceToNow} from 'date-fns'
import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {commentsList: [], username: '', comment: ''}

  onChangeNameInput = event => {
    this.setState({username: event.target.value})
  }

  onChangeCommentInput = event => {
    this.setState({comment: event.target.value})
  }

  onClikeLikeBtn = id => {
    this.setState(prevState => ({
      commentsList: [
        ...prevState.commentsList.map(eachItem =>
          eachItem.id === id
            ? {...eachItem, isLiked: !eachItem.isLiked}
            : eachItem,
        ),
      ],
    }))
  }

  onDeleteComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(
        eachItem => eachItem.id !== id,
      ),
    }))
  }

  onFormSubmit = event => {
    event.preventDefault()

    const {username, comment} = this.state

    if (username !== '' && comment !== '') {
      const lastPosted = formatDistanceToNow(new Date())

      const initialClassName =
        initialContainerBackgroundClassNames[Math.floor(Math.random() * 7)]

      const commentItem = {
        id: uuidv4(),
        name: username,
        userComment: comment,
        date: lastPosted,
        initialContainerClassName: initialClassName,
        isLiked: false,
      }

      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, commentItem],
        username: '',
        comment: '',
      }))
    }
  }

  render() {
    const {commentsList, username, comment} = this.state
    return (
      <div className="bg-container">
        <div>
          <div className="top-container">
            <div>
              <h1 className="main-heading">Comments</h1>
              <div className="img-cont">
                <img
                  className="comment-img-small"
                  src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                  alt="comments"
                />
              </div>
              <p className="main-para">Say something about 4.0 Technologies</p>
              <form className="form-container">
                <input
                  value={username}
                  onChange={this.onChangeNameInput}
                  type="text"
                  placeholder="Your Name"
                />
                <textarea
                  value={comment}
                  onChange={this.onChangeCommentInput}
                  rows="6"
                  cols="30"
                  placeholder="Your Comment"
                ></textarea>
                <button
                  type="submit"
                  className="add-cmt-btn"
                  onClick={this.onFormSubmit}
                >
                  Add Comment
                </button>
              </form>
            </div>
            <img
              className="comment-img-large"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comment"
            />
          </div>
          <hr />

          <div>
            <div className="cmt-count-container">
              <div className="cmt-count">{commentsList.length}</div>
              <p>Comments</p>
            </div>

            <ul className="ul-container">
              {commentsList.map(eachItem => (
                <CommentItem
                  commentDetails={eachItem}
                  key={eachItem.id}
                  onClikeLikeBtn={this.onClikeLikeBtn}
                  onDeleteComment={this.onDeleteComment}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Comments
