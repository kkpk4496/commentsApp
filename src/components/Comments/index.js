import {Component} from 'react'
import './index.css'
import {formatDistanceToNow} from 'date-fns'
import {v4 as uuidV4} from 'uuid'
import CommentItem from '../CommentItem'

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
  state = {
    name: '',
    comment: '',
    count: 0,
    arrayList: [],
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  addComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const firstName = name[0]
    const timeStamp = formatDistanceToNow(new Date())
    const classIndex =
      initialContainerBackgroundClassNames[Math.floor(Math.random() * 7)]

    const object = {
      id: uuidV4(),
      firstNames: firstName,
      dates: timeStamp,
      names: name,
      comments: comment,
      newClass: classIndex,
      isFavorite: false,
    }
    this.setState(prevState => ({
      arrayList: [...prevState.arrayList, object],
      name: '',
      comment: '',
      count: prevState.count + 1,
    }))
  }

  toggleFavorite = id => {
    this.setState(prevState => ({
      arrayList: prevState.arrayList.map(eachData => {
        if (eachData.id === id) {
          return {...eachData, isFavorite: !eachData.isFavorite}
        }
        return eachData
      }),
    }))
  }

  deleteComment = id => {
    const {arrayList} = this.state
    const filteredList = arrayList.filter(eachValue => eachValue.id !== id)
    this.setState(prevState => ({
      arrayList: filteredList,
      count: prevState.count - 1,
    }))
  }

  render() {
    const {name, comment, count, arrayList} = this.state
    return (
      <div className="container">
        <div className="comment-container">
          <div className="inputContainer">
            <h1 className="comment-title">Comments</h1>
            <p className="comment-para">Say something about 4.0 Technologies</p>
            <form onSubmit={this.addComment}>
              <input
                className="inputs"
                value={name}
                type="text"
                placeholder="Your Name"
                onChange={this.onChangeName}
              />
              <br />
              <textarea
                className="inputs inputs1"
                value={comment}
                type="text"
                placeholder="Your Comment"
                onChange={this.onChangeComment}
              />
              <br />
              <button type="submit">Add Comment</button>
            </form>
          </div>
          <div className="imageContainer">
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
        </div>
        <p>
          <span className="span">{count} </span>Comments
        </p>
        <ul>
          {arrayList.map(eachArray => (
            <CommentItem
              key={eachArray.id}
              arrayList={eachArray}
              deleteComment={this.deleteComment}
              toggleFavorite={this.toggleFavorite}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
