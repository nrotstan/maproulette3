import React from 'react'
import CommentList from './CommentList'

let basicProps = null

beforeEach(() => {
  basicProps = {
    comments: [
      {
        id: 123,
        osm_username: "bob",
        comment: "Bob's comment",
        created: 1510357997739,
      },
      {
        id: 456,
        osm_username: "sarah",
        comment: "Sarah's comment",
        created: 1511647443002,
      },
      {
        id: 789,
        osm_username: "joe",
        comment: "Joe's comment",
        created: 1516200787649,
      },
    ]
  }
})

test('it renders a list of the given comments', () => {
  const wrapper = shallow(
    <CommentList {...basicProps} />
  )

  expect(wrapper.find('li').length).toBe(basicProps.comments.length)

  // Make sure each comment is represented in the list
  basicProps.comments.forEach(comment => {
    expect(new RegExp(comment.osm_username).test(wrapper.text())).toBe(true)
  })

  expect(wrapper).toMatchSnapshot()
})

test('it renders a div with class none if there are no comments', () => {
  basicProps.comments= []

  const wrapper = shallow(
    <CommentList {...basicProps} />
  )

  expect(wrapper.find('li').length).toBe(0)
  expect(wrapper.find('.none').exists()).toBe(true)
  expect(wrapper).toMatchSnapshot()
})

test("task links are not shown by default", () => {
  const wrapper = shallow(
    <CommentList {...basicProps} />
  )

  expect(wrapper.find('.comment-list__comment--task-link').exists()).not.toBe(true)
})

test("task links are shown if includeTaskLinks prop is set to true", () => {
  const wrapper = shallow(
    <CommentList includeTaskLinks {...basicProps} />
  )

  expect(wrapper.find(
    '.comment-list__comment--task-link'
  ).length).toBe(basicProps.comments.length)

  expect(wrapper).toMatchSnapshot()
})
