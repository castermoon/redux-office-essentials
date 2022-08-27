import React, {Fragment} from 'react'
import { useSelector } from 'react-redux'
import { AddPostForm } from "./AddPostForm";
import { Link } from 'react-router-dom'
import { TimeAgo } from "./TimeAgo";
import { PostAuthor } from "./PostAuthor";
import { ReactionButtons } from "./ReactionButtons";



export const PostsList = () => {
	const posts = useSelector(state => state.posts)

	//array.sort()会改变原数组，所以需要卡
	const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

	const renderedPosts = orderedPosts.map(post => {
		return (
			<article className="post-excerpt" key={post.id}>
				<h3>{post.title}</h3>
				<div>
					<PostAuthor userId={post.id} />
					<TimeAgo timestamp={post.date} />
				</div>
				<p className="post-content">{post.content.substring(0, 100)}</p>
				<Link to={`/posts/${post.id}`} className="button muted-button">
					View Post
				</Link>
				<ReactionButtons post={post}/>
			</article>
		)
	})

	return (
		<Fragment>
			<AddPostForm/>
			<section className="posts-list">
				<h2>Posts</h2>
				{renderedPosts}
			</section>
		</Fragment>
	)
}
