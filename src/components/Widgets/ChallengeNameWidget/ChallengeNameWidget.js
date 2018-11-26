import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { WidgetDataTarget, registerWidgetType }
       from '../../../services/Widget/Widget'
import ChallengeInfoSummary
       from '../../TaskPane/ChallengeInfoSummary/ChallengeInfoSummary'
import QuickWidget from '../../QuickWidget/QuickWidget'
import messages from './Messages'

const descriptor = {
  widgetKey: 'ChallengeNameWidget',
  label: messages.label,
  targets: [WidgetDataTarget.task],
  minWidth: 3,
  defaultWidth: 3,
  minHeight: 3,
  defaultHeight: 6,
}

export class ChallengeNameWidget extends Component {
  render() {
    return (
      <QuickWidget {...this.props}
                  className="challenge-name-widget"
                  widgetTitle={<FormattedMessage {...messages.title} />}>
        <ChallengeInfoSummary {...this.props} />
      </QuickWidget>
    )
  }
}

registerWidgetType(ChallengeNameWidget, descriptor)
