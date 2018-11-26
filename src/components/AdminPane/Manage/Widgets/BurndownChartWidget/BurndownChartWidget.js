import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { WidgetDataTarget, registerWidgetType }
       from '../../../../../services/Widget/Widget'
import BurndownChart from '../../BurndownChart/BurndownChart'
import QuickWidget from '../QuickWidget'
import messages from './Messages'
import './BurndownChartWidget.css'

const descriptor = {
  widgetKey: 'BurndownChartWidget',
  label: messages.label,
  targets: [WidgetDataTarget.challenges, WidgetDataTarget.challenge],
  minWidth: 3,
  defaultWidth: 4,
  defaultHeight: 12,
}

export class BurndownChartWidget extends Component {
  render() {
    return (
      <QuickWidget {...this.props}
                  className="burndown-chart-widget"
                  widgetTitle={
                    <FormattedMessage {...messages.title}
                                      values={{taskCount: this.props.tasksAvailable}} />
                  }>
        <BurndownChart {...this.props} suppressHeading />
      </QuickWidget>
    )
  }
}

registerWidgetType(BurndownChartWidget, descriptor)
