import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { WidgetDataTarget, registerWidgetType }
       from '../../../services/Widget/Widget'
import WithCurrentUser from '../../HOCs/WithCurrentUser/WithCurrentUser'
import WithEditor from '../../HOCs/WithEditor/WithEditor'
import ActiveTaskDetails from '../../TaskPane/ActiveTaskDetails/ActiveTaskDetails'
import QuickWidget from '../../QuickWidget/QuickWidget'
import messages from './Messages'

const TaskDetailsSidebar = WithCurrentUser(WithEditor(ActiveTaskDetails))

const descriptor = {
  widgetKey: 'TaskSidebarWidget',
  label: messages.label,
  targets: [WidgetDataTarget.task],
  minWidth: 3,
  defaultWidth: 3,
  defaultHeight: 19,
}

export class TaskSidebarWidget extends Component {
  render() {
    return (
      <QuickWidget {...this.props}
                  className="task-sidebar-widget"
                  widgetTitle={<FormattedMessage {...messages.title} />}>
        <TaskDetailsSidebar {...this.props} />
      </QuickWidget>
    )
  }
}

registerWidgetType(TaskSidebarWidget, descriptor)
