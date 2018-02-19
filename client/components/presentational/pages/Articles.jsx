import React, { Component } from 'react'
import PropTypes from 'prop-types'

const ArticlesList = ({ title, post }) => {
	return (
		<div className='col-lg-4 col-md-6 mb-4'>
			<div className='card'>
				<div className='view overlay hm-white-slight'>
					<img src='https://mdbootstrap.com/img/Photos/Horizontal/People/6-col/img (133).jpg' className='img-fluid' alt='photo' />
					<a href='#!'>
						<div className='mask'></div>
					</a>
				</div>
				<div className='card-body text-left'>
					<h4 className='card-title'><strong>{title}</strong></h4>
					<p className='card-text'>
						{post}
					</p>
					<a href='#'><span className='fa fa-star checked'></span></a>
					<a href='#'><span className='fa fa-star checked'></span></a>
					<a href='#'><span className='fa fa-star checked'></span></a>
					<a href='#'><span className='fa fa-star checked'></span></a>
					<a href='#'><span className='fa fa-star checked'></span></a> |
                  <a href='#'>
						<p> 0 comments </p>
					</a>
					<a href='./comment.html' className='btn btn-deep-orange btn-md'>Read more</a>
				</div>
			</div>
		</div>
	)
}

ArticlesList.propTypes = {

}

export default ArticlesList
