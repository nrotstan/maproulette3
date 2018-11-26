import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { WidgetDataTarget, registerWidgetType }
       from '../../../services/Widget/Widget'
import CommentList from '../../CommentList/CommentList'
import CommentCountBadge from '../../CommentList/CommentCountBadge/CommentCountBadge'
import QuickWidget from '../../QuickWidget/QuickWidget'
import messages from './Messages'

const descriptor = {
  widgetKey: 'TaskCommentsWidget',
  label: messages.label,
  targets: [WidgetDataTarget.task],
  minWidth: 3,
  defaultWidth: 3,
  minHeight: 3,
  defaultHeight: 6,
}

export class TaskCommentsWidget extends Component {
  render() {
    const badge = <CommentCountBadge comments={this.props.task.comments} />

    return (
      <QuickWidget {...this.props}
                  className="task-comments-widget"
                  widgetTitle={<FormattedMessage {...messages.title} />}
                  leftHeaderControls={badge}>
        <CommentList comments={this.props.task.comments} />
      </QuickWidget>
    )
  }
}

registerWidgetType(TaskCommentsWidget, descriptor)
