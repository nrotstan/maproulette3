import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { WidgetDataTarget, registerWidgetType }
       from '../../../../../services/Widget/Widget'
import ViewChallengeTasks from '../../ViewChallengeTasks/ViewChallengeTasks'
import QuickWidget from '../QuickWidget'
import messages from './Messages'

const descriptor = {
  widgetKey: 'ChallengeTasksWidget',
  label: messages.label,
  targets: [WidgetDataTarget.challenge],
  minWidth: 4,
  defaultWidth: 8,
  defaultHeight: 49,
}

export class ChallengeTasksWidget extends Component {
  render() {
    return (
      <QuickWidget {...this.props}
                  className="calendar-heatmap-widget"
                  widgetTitle={<FormattedMessage {...messages.title} />}>
        <ViewChallengeTasks {...this.props} />
      </QuickWidget>
    )
  }
}

registerWidgetType(ChallengeTasksWidget, descriptor)
