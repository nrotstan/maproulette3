import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { WidgetDataTarget, registerWidgetType }
       from '../../../services/Widget/Widget'
import WithCurrentUser from '../../HOCs/WithCurrentUser/WithCurrentUser'
import WithEditor from '../../HOCs/WithEditor/WithEditor'
import ActiveTaskControls
       from '../../TaskPane/ActiveTaskDetails/ActiveTaskControls/ActiveTaskControls'
import ReviewTaskControls
       from '../../TaskPane/ActiveTaskDetails/ReviewTaskControls/ReviewTaskControls'
import QuickWidget from '../../QuickWidget/QuickWidget'
import messages from './Messages'

const descriptor = {
  widgetKey: 'TaskCompletionWidget',
  label: messages.label,
  targets: [WidgetDataTarget.task],
  minWidth: 3,
  defaultWidth: 3,
  minHeight: 3,
  defaultHeight: 12,
}

export class TaskCompletionWidget extends Component {
  render() {
    const taskControls =
      this.props.reviewTask ?
      <ReviewTaskControls className="active-task-details__controls" {...this.props} /> :
      <ActiveTaskControls className="active-task-details__controls" {...this.props} />

    return (
      <QuickWidget {...this.props}
                  className="task-controls-widget"
                  widgetTitle={<FormattedMessage {...messages.title} />}>
        {taskControls}
      </QuickWidget>
    )
  }
}

registerWidgetType(WithCurrentUser(WithEditor(TaskCompletionWidget)), descriptor)
