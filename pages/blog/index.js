import { createClient } from 'contentful'
import BlogPostCard from '../../components/BlogPostCard'
export async function getStaticProps() {
	const client = createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_KEY,
	})

	const res = await client.getEntries({
		content_type: 'blogPost',
	})

	return {
		props: {
			blogPosts: res.items,
		},
	}
}

export default function Blog({ blogPosts }) {

	return (
		<div className="blog-list">
			{blogPosts.map((post) => (
				<BlogPostCard key={post.sys.id} post={post} />
			))}
			<style jsx>
				{`
					.blog-list {
						display: grid;
						grid-template-columns: 1fr 1fr;
						grid-gap: 20px 60px;
					}
				`}
			</style>
		</div>
	)
}