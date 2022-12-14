import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import { ReactionButtons } from "./ReactionButtons";
import {PostAuthor} from "./PostAuthor";
import {TimeAgo} from "./TimeAgo";
import { selectPostById } from './postsSlice'

export const SinglePostPage = ( ) => {
	const { postId } = useParams()
	const post = useSelector(state => selectPostById(state, postId))


	if (!post) {
		return (
			<section>
				<h2>Post not found!</h2>
			</section>
		)
	}

	return (
		<section>
			<article className="post">
				<h2>{post.title}</h2>
				<p className="post-content">{post.content}</p>
				<Link to={`/editPost/${post.id}`} className="button">
					Edit Post
				</Link>
				<div>
					<PostAuthor userId={post.id} />
					<TimeAgo timestamp={post.date} />
				</div>
				<ReactionButtons post={post}/>
			</article>
		</section>
	)
}
