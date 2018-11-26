import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MediaQuery from 'react-responsive'
import _isFinite from 'lodash/isFinite'
import _get from 'lodash/get'
import { generateWidgetId, WidgetDataTarget, widgetDescriptor }
       from '../../services/Widget/Widget'
import WithWidgetWorkspaces
       from '../HOCs/WithWidgetWorkspaces/WithWidgetWorkspaces'
import WithCurrentUser from '../HOCs/WithCurrentUser/WithCurrentUser'
import WithChallengePreferences
       from '../HOCs/WithChallengePreferences/WithChallengePreferences'
import WidgetWorkspace from '../WidgetWorkspace/WidgetWorkspace'
import MapPane from '../EnhancedMap/MapPane/MapPane'
import TaskMap from './TaskMap/TaskMap'
import BusySpinner from '../BusySpinner/BusySpinner'
import MobileTaskDetails from './MobileTaskDetails/MobileTaskDetails'
import './TaskPane.css'

// Setup child components with necessary HOCs
const MobileTabBar = WithCurrentUser(MobileTaskDetails)

const WIDGET_WORKSPACE_NAME = "taskCompletion"

export const defaultWorkspaceSetup = function() {
  return {
    dataModelVersion: 2,
    name: WIDGET_WORKSPACE_NAME,
    label: "Task Completion",
    widgets: [
      widgetDescriptor('ChallengeNameWidget'),
      widgetDescriptor('TaskInstructionsWidget'),
      widgetDescriptor('TaskCommentsWidget'),
      widgetDescriptor('TaskCompletionWidget'),
      widgetDescriptor('TaskMoreOptionsWidget'),
      widgetDescriptor('KeyboardShortcutsWidget'),
      widgetDescriptor('TaskLocationWidget'),
      widgetDescriptor('CompletionProgressWidget'),
      widgetDescriptor('ChallengeShareWidget'),
      widgetDescriptor('TaskMapWidget'),
    ],
    layout: [
      {i: generateWidgetId(), x: 0, y: 0, w: 3, h: 6},
      {i: generateWidgetId(), x: 0, y: 6, w: 3, h: 8},
      {i: generateWidgetId(), x: 0, y: 14, w: 3, h: 4},
      {i: generateWidgetId(), x: 0, y: 18, w: 3, h: 12},
      {i: generateWidgetId(), x: 0, y: 30, w: 3, h: 6},
      {i: generateWidgetId(), x: 0, y: 36, w: 3, h: 7},
      {i: generateWidgetId(), x: 0, y: 43, w: 3, h: 10},
      {i: generateWidgetId(), x: 0, y: 53, w: 3, h: 4},
      {i: generateWidgetId(), x: 0, y: 57, w: 3, h: 3},
      {i: generateWidgetId(), x: 4, y: 0, w: 9, h: 19},
    ],
  }
}

/**
 * TaskPane presents the current task being actively worked upon. It contains
 * an ActiveTaskDetails sidebar, which offers information and controls, and a
 * TaskMap displaying the appropriate map and task geometries.
 *
 * @see See ActiveTaskDetails
 * @see See TaskMap
 *
 * @author [Neil Rotstan](https://github.com/nrotstan)
 */
export class TaskPane extends Component {
  state = {
    /**
     * id of task once user initiates completion. This is used to help our
     * animation transitions.
     */
    completingTask: null,
  }

  /**
   * Invoked by various completion controls to signal the user is completing
   * the task with a specific status. Normally this would just go straight to
   * WithCurrentTask, but we intercept the call so that we can manage our
   * transition animation as the task prepares to complete.
   */
  completeTask = (taskId, challengeId, taskStatus, comment, taskLoadBy) => {
    this.setState({completingTask: taskId})
    this.props.completeTask(taskId, challengeId, taskStatus, comment, taskLoadBy)
  }

  clearCompletingTask = () => {
    // Clear on next tick to give our animation transition a chance to clean up.
    setTimeout(() => {
      this.setState({completingTask: null})
    }, 0)
  }

  render() {
    if (!_isFinite(_get(this.props, 'task.id'))) {
      return (
        <div className="pane-loading full-screen-height">
          <BusySpinner />
        </div>
      )
    }

    return (
      <div className='task-pane'>
        <MediaQuery query="(min-width: 1024px)">
          <WidgetWorkspace {...this.props}
                           completeTask={this.completeTask}
                           completingTask={this.state.completingTask} />
        </MediaQuery>
        <MediaQuery query="(max-width: 1023px)">
          <MapPane completingTask={this.state.completingTask}>
            <TaskMap isMobile
                     task={this.props.task}
                     challenge={this.props.task.parent}
                     {...this.props} />
          </MapPane>
          <MobileTabBar {...this.props} />
        </MediaQuery>
      </div>
    )
  }
}

TaskPane.propTypes = {
  /** The task to be worked upon. */
  task: PropTypes.object,
}

export default
WithChallengePreferences(
  WithWidgetWorkspaces(
    TaskPane,
    WidgetDataTarget.task,
    WIDGET_WORKSPACE_NAME,
    defaultWorkspaceSetup
  )
)
