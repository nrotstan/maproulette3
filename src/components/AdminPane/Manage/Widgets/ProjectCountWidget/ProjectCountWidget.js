import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { WidgetDataTarget, registerWidgetType }
       from '../../../../../services/Widget/Widget'
import QuickWidget from '../QuickWidget'
import messages from './Messages'

const descriptor = {
  widgetKey: 'ProjectCountWidget',
  label: messages.label,
  targets: [WidgetDataTarget.projects],
  minWidth: 2,
  defaultWidth: 6,
  defaultHeight: 4,
}

export class ProjectCountWidget extends Component {
  render() {
    return (
      <QuickWidget {...this.props}
                  className="project-count-widget"
                  widgetTitle={<FormattedMessage {...messages.title} />}>
        <h1>{this.props.filteredProjects.length}</h1>
      </QuickWidget>
    )
  }
}

ProjectCountWidget.propTypes = {
  blockProjectFilters: PropTypes.object,
  updateWidgetConfiguration: PropTypes.func.isRequired,
  filteredProjects: PropTypes.array,
}

registerWidgetType(ProjectCountWidget, descriptor)
