import React from "react"
import { graphql, Link } from "gatsby"
import kebabCase from "lodash/kebabCase"
import Layout from "../components/layout"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const { tags } = frontmatter
  return (
    <Layout>
      <div className="blog-post-container">
        <div className="blog-post">
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <footer>
            Tags:
            {tags.map(singleTag => (
              <Link to={`/tags/${kebabCase(singleTag)}/`}>{singleTag}</Link>
            ))}
          </footer>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
      }
    }
  }
`
