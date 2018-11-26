import React, { Component } from 'react'
import { FormattedMessage, FormattedDate } from 'react-intl'
import _get from 'lodash/get'
import { ChallengeStatus, messagesByStatus }
       from  '../../../../../services/Challenge/ChallengeStatus/ChallengeStatus'
import { WidgetDataTarget, registerWidgetType }
       from '../../../../../services/Widget/Widget'
import AsManager from '../../../../../interactions/User/AsManager'
import ChallengeKeywords from '../../ChallengeKeywords/ChallengeKeywords'
import VisibilitySwitch from '../../VisibilitySwitch/VisibilitySwitch'
import QuickWidget from '../QuickWidget'
import messages from './Messages'
import './ChallengeOverviewWidget.css'

const descriptor = {
  widgetKey: 'ChallengeOverviewWidget',
  label: messages.label,
  targets: [WidgetDataTarget.challenge],
  minWidth: 3,
  defaultWidth: 4,
  defaultHeight: 7,
}

export class ChallengeOverviewWidget extends Component {
  render() {
    const manager = AsManager(this.props.user)
    const status = _get(this.props, 'challenge.status', ChallengeStatus.none)

    return (
      <QuickWidget {...this.props}
                  className="challenge-overview-widget"
                  widgetTitle={<FormattedMessage {...messages.title} />}>
        <div className="columns">
          <div className="column is-one-third status-label">
            <FormattedMessage {...messages.status} />
          </div>

          <div className="column is-narrow status-value">
            <FormattedMessage {...messagesByStatus[status]} />
          </div>
        </div>

        <div className="columns">
          <div className="column is-one-third status-label">
            <FormattedMessage {...messages.visibleLabel} />
          </div>

          <div className="column is-narrow status-value">
            {this.props.challenge.parent &&
             <VisibilitySwitch {...this.props}
                               disabled={!manager.canWriteProject(this.props.challenge.parent)} />
            }
          </div>
        </div>

        <ChallengeKeywords challenge={this.props.challenge} />

        <div className="columns">
          <div className="column is-one-third status-label">
            <FormattedMessage {...messages.creationDate} />
          </div>

          <div className="column is-narrow status-value">
            {this.props.challenge.created &&
             <FormattedDate value={new Date(this.props.challenge.created)}
                            year='numeric' month='long' day='2-digit' />
            }
          </div>
        </div>

        <div className="columns">
          <div className="column is-one-third status-label">
            <FormattedMessage {...messages.lastModifiedDate} />
          </div>

          <div className="column is-narrow status-value">
            {this.props.challenge.modified &&
             <FormattedDate value={new Date(this.props.challenge.modified)}
                            year='numeric' month='long' day='2-digit' />
            }
          </div>
        </div>

        <div className="columns">
          <div className="column is-one-third status-label">
            <FormattedMessage {...messages.tasksRefreshDate} />
          </div>

          <div className="column is-narrow status-value">
            {this.props.challenge.lastTaskRefresh &&
             <FormattedDate value={new Date(this.props.challenge.lastTaskRefresh)}
                            year='numeric' month='long' day='2-digit' />
            }
          </div>
        </div>
      </QuickWidget>
    )
  }
}

registerWidgetType(ChallengeOverviewWidget, descriptor)
