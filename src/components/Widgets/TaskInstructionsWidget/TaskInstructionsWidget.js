import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import _get from 'lodash/get'
import _isFinite from 'lodash/isFinite'
import { WidgetDataTarget, registerWidgetType }
       from '../../../services/Widget/Widget'
import TaskInstructions from '../../TaskPane/TaskInstructions/TaskInstructions'
import QuickWidget from '../../QuickWidget/QuickWidget'
import messages from './Messages'

const descriptor = {
  widgetKey: 'TaskInstructionsWidget',
  label: messages.label,
  targets: [WidgetDataTarget.task],
  minWidth: 3,
  defaultWidth: 3,
  minHeight: 2,
  defaultHeight: 6,
}

export class TaskInstructionsWidget extends Component {
  /**
   * Invoked to toggle minimization of the challenge instructions. If the user
   * is working through a virtual challenge, we nevertheless set the preference
   * on the actual challenge being worked on (not the virtual challenge) as the
   * instructions will obviously vary from challenge to challenge if the user
   * works through tasks from multiple challenges.
   */
  toggleMinimized = () => {
    const challengeId = _get(this.props.task, 'parent.id')
    if (_isFinite(challengeId)) {
      this.props.setInstructionsCollapsed(challengeId, false, !this.props.collapseInstructions)
    }
  }

  adjustHeightForMinimization = () => {
    if (this.props.collapseInstructions &&
        this.props.widgetLayout.h > descriptor.minHeight) {
      this.props.updateWidgetHeight(this.props.widgetLayout.i, descriptor.minHeight) 
    }
    else if (!this.props.collapseInstructions &&
             this.props.widgetLayout.h === descriptor.minHeight) {
      this.props.updateWidgetHeight(this.props.widgetLayout.i, descriptor.defaultHeight) 
    }
  }

  componentDidMount() {
    this.adjustHeightForMinimization()
  }

  componentDidUpdate() {
    this.adjustHeightForMinimization()
  }

  render() {
    const minimizeControl = (
      <a className="collapsible-icon" aria-label="more options"
         onClick={this.toggleMinimized}>
        <span className="icon"></span>
      </a>
    )

    return (
      <QuickWidget {...this.props}
                   className={classNames(
                      "task-instructions-widget",
                      {"is-expanded": !this.props.collapseInstructions})}
                  widgetTitle={<FormattedMessage {...messages.title} />}
                  rightHeaderControls={minimizeControl}>
        {!this.props.collapseInstructions && <TaskInstructions {...this.props} />}
      </QuickWidget>
    )
  }
}

TaskInstructionsWidget.propTypes = {
  collapseInstructions: PropTypes.bool,
  setInstructionsCollapsed: PropTypes.func.isRequired,
}

registerWidgetType(TaskInstructionsWidget, descriptor)
