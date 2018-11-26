import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { WidgetDataTarget, registerWidgetType }
       from '../../../services/Widget/Widget'
import MapPane from '../../EnhancedMap/MapPane/MapPane'
import TaskMap from '../../TaskPane/TaskMap/TaskMap'
import QuickWidget from '../../QuickWidget/QuickWidget'
import messages from './Messages'

const descriptor = {
  widgetKey: 'TaskMapWidget',
  label: messages.label,
  targets: [WidgetDataTarget.task],
  minWidth: 4,
  defaultWidth: 9,
  minHeight: 5,
  defaultHeight: 19,
}

export class TaskMapWidget extends Component {
  render() {
    return (
      <QuickWidget {...this.props}
                  className="task-map-widget"
                  widgetTitle={<FormattedMessage {...messages.title} />}>
        <MapPane {...this.props}>
          <TaskMap {...this.props} challenge={this.props.task.parent} />
        </MapPane>
      </QuickWidget>
    )
  }
}

registerWidgetType(TaskMapWidget, descriptor)
