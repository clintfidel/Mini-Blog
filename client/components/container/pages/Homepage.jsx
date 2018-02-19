import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import '../../../public/css/style.css'
import Articles from '../../presentational/pages/Articles'
import NavBar from '../../presentational/includes/NavBar'
import Footer from '../../presentational/includes/Footer'
import { logoutAction } from '../../../actions/AuthAction'
import getAllArticles from '../../../actions/ArticlesAction'

class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loader: false
    }
    this.renderAllArticles = this.renderAllArticles.bind(this)
  }

  componentDidMount () {
    $('.modal').on('shown.bs.modal', () => {
      $('.all-articles, .container-comment').css({ opacity: 0.9 })
    })

    // when modal closes
    $('.modal').on('hidden.bs.modal', () => {
      $('.all-articles, .container-comment').css({ opacity: 1 })
    })

    $(document).ready(() => {
      $('.material-button-toggle').on('click', () => {
        $(this).toggleClass('open')
        $('.option').toggleClass('scale-on')
      })
    })

    this.setState({
      loader: true
    })

    this.props.getAllArticles()
  // .then(() => {
  //   this.setState({
  //     loader: false
  //   })
  // })
  }

  renderAllArticles () {
    let allArticles = this.props.articles
    if (allArticles.length < 1) {
      return <div className='not-found'>
               <h1>No article found</h1>
             </div>
    }

    return (
      <main className='all-articles'>
        <div className='container mt-4'>
          <div className='row'>
            {allArticles.map((article) => (
               <Articles
                 title={article.blogTitle}
                 post={article.blogPost}
                 views={article.views}
                 id={article.id}
                 key={article.id} />
             )
             )}
          </div>
        </div>
      </main>)
  }



  render () {
    return (
      <div>
        <div className='all-page'>
          <NavBar
          logout={this.props.logoutAction}
          authenticated = {this.props.isAuthenticated} />
          <div>
            {this.renderAllArticles()}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}
// HomePage.propTypes = {

// }
const mapStateToProps = (state) => {
  console.log(state)
  return {
    articles: state.ArticleReducer.articles,
    isAuthenticated: state.AuthReducer.authenticated
  }
}

export default connect(mapStateToProps, {getAllArticles, logoutAction})(HomePage)
