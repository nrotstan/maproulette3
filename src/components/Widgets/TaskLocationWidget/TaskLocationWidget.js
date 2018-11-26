import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { WidgetDataTarget, registerWidgetType }
       from '../../../services/Widget/Widget'
import TaskLocationMap from '../../TaskPane/TaskLocationMap/TaskLocationMap'
import PlaceDescription from '../../TaskPane/PlaceDescription/PlaceDescription'
import TaskLatLon from '../../TaskPane/TaskLatLon/TaskLatLon'
import QuickWidget from '../../QuickWidget/QuickWidget'
import messages from './Messages'

const descriptor = {
  widgetKey: 'TaskLocationWidget',
  label: messages.label,
  targets: [WidgetDataTarget.task],
  minWidth: 3,
  defaultWidth: 3,
  minHeight: 2,
  defaultHeight: 8,
}

export class TaskLocationWidget extends Component {
  render() {
    return (
      <QuickWidget {...this.props}
                  className="task-map-widget"
                  widgetTitle={<FormattedMessage {...messages.title} />}>
        <div className="active-task-details--inset-map">
          <TaskLocationMap {...this.props} key={this.props.task.id} />
        </div>

        <PlaceDescription place={this.props.task.place}
                          className="active-task-details--place"/>

        <TaskLatLon task={this.props.task}
                    className="active-task-details__lat-lon" />
      </QuickWidget>
    )
  }
}

registerWidgetType(TaskLocationWidget, descriptor)
