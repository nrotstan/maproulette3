import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { WidgetDataTarget, registerWidgetType }
       from '../../../../../services/Widget/Widget'
import ChallengeProgress from '../../../../ChallengeProgress/ChallengeProgress'
import QuickWidget from '../QuickWidget'
import messages from './Messages'

const descriptor = {
  widgetKey: 'CompletionProgressWidget',
  label: messages.label,
  targets: [WidgetDataTarget.challenges, WidgetDataTarget.challenge],
  minWidth: 3,
  defaultWidth: 4,
  defaultHeight: 5,
}

export class CompletionProgressWidget extends Component {
  render() {
    return (
      <QuickWidget {...this.props}
                  className="completion-progress-widget"
                  widgetTitle={<FormattedMessage {...messages.title} />}>
         <ChallengeProgress {...this.props} />
      </QuickWidget>
    )
  }
}

registerWidgetType(CompletionProgressWidget, descriptor)
