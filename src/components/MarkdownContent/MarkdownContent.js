import React, { Component } from 'react'
import remark from 'remark'
import reactRenderer from 'remark-react'
import PropTypes from 'prop-types'

export default class MarkdownContent extends Component {
  render() {
    if (!this.props.markdown) {
      return null
    }

    // Replace any occurrences of \r\n with newlines.
    const normalizedMarkdown = this.props.markdown.replace(/\r\n/mg, "\n\n")

    return (
      <div className={this.props.className}>
        {remark().use(reactRenderer).processSync(normalizedMarkdown).contents}
      </div>
    )
  }
}

MarkdownContent.propTypes = {
  markdown: PropTypes.string,
}
