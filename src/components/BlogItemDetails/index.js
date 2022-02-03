import {Component} from 'react'

import './index.css'
// import {async} from 'rxjs'

class BlogItemDetails extends Component {
  state = {blogData: {}}

  componentDidMount() {
    this.getBlogItemDetails()
  }

  getBlogItemDetails = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const fetchingData = async () => {
      const url = `https://apis.ccbp.in/blogs/${id}`
      const response = await fetch(url)
      const jsonData = await response.json()
      console.log(jsonData)

      const updatedData = {
        id: jsonData.id,
        title: jsonData.title,
        imageUrl: jsonData.image_url,
        avatarUrl: jsonData.avatar_url,
        author: jsonData.author,
        topic: jsonData.topic,
        content: jsonData.content,
      }
      this.setState({
        blogData: updatedData,
      })
    }

    fetchingData()
  }

  renderBlogItemDetails = () => {
    const {blogData} = this.state
    const {title, imageUrl, content, avatarUrl, author} = blogData
    return (
      <div className="blog-info">
        <h2 className="blog-details-title">{title}</h2>

        <div className="author-details">
          <img className="author-pic" src={avatarUrl} alt={author} />
          <p className="details-author-name">{author}</p>
        </div>

        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    console.log('this', this.props)
    return <div className="blog-container">{this.renderBlogItemDetails()}</div>
  }
}

export default BlogItemDetails
