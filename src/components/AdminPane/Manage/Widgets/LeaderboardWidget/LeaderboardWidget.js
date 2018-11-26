import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { WidgetDataTarget, registerWidgetType }
       from '../../../../../services/Widget/Widget'
import ChallengeOwnerLeaderboard
       from '../../ChallengeOwnerLeaderboard/ChallengeOwnerLeaderboard'
import PastDurationSelector
       from '../../../../PastDurationSelector/PastDurationSelector'
import QuickWidget from '../QuickWidget'
import messages from './Messages'
import './LeaderboardWidget.css'

const descriptor = {
  widgetKey: 'LeaderboardWidget',
  label: messages.label,
  targets: [WidgetDataTarget.challenges, WidgetDataTarget.challenge],
  minWidth: 3,
  defaultWidth: 4,
  defaultHeight: 8,
  defaultConfiguration: {
    monthsPast: 1,
  },
}

export class LeaderboardWidget extends Component {
  setMonthsPast = monthsPast => {
    if (this.props.widgetConfiguration.monthsPast !== monthsPast) {
      this.props.updateWidgetConfiguration({monthsPast})
    }
  }

  render() {
    const monthsPast = this.props.widgetConfiguration.monthsPast || 1

    const selector =
      <PastDurationSelector pastMonthsOptions={[1, 3, 6, 12]}
                            currentMonthsPast={monthsPast}
                            selectDuration={this.setMonthsPast} />

    return (
      <QuickWidget {...this.props}
                  className="leaderboard-widget"
                  widgetTitle={<FormattedMessage {...messages.title} />}
                  headerControls={selector}>
        <ChallengeOwnerLeaderboard suppressHeader
                              monthsPast={monthsPast}
                              {...this.props} />
      </QuickWidget>
    )
  }
}

registerWidgetType(LeaderboardWidget, descriptor)
