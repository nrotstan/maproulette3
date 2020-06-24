import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { WidgetDataTarget, registerWidgetType }
       from '../../../services/Widget/Widget'
import ReviewStatusMetrics from '../../../pages/Review/Metrics/ReviewStatusMetrics'
import WithReviewMetrics from '../../HOCs/WithReviewMetrics/WithReviewMetrics'
import QuickWidget from '../../QuickWidget/QuickWidget'
import messages from './Messages'

const descriptor = {
  widgetKey: 'ReviewStatusMetricsWidget',
  label: messages.label,
  targets: [WidgetDataTarget.review, WidgetDataTarget.challenge,
            WidgetDataTarget.challenges],
  minWidth: 2,
  defaultWidth: 4,
  minHeight: 4,
  defaultHeight: 6,
  defaultConfiguration: {
    showByPriority: false,
  },
}

export default class ReviewStatusMetricsWidget extends Component {
  setShowByPriority = showByPriority => {
    this.props.updateWidgetConfiguration({showByPriority: !!showByPriority})
  }

  setShowByTaskStatus = showByTaskStatus => {
    this.props.updateWidgetConfiguration({showByTaskStatus: !!showByTaskStatus})
  }

  render() {
    return (
      <QuickWidget
        {...this.props}
        className=""
        widgetTitle={
          <FormattedMessage {...messages.title} />
        }
        noMain
      >
        <ReviewStatusMetrics
          {...this.props}
          showByPriority={this.props.widgetConfiguration.showByPriority}
          setShowByPriority={this.setShowByPriority}
          showByTaskStatus={this.props.widgetConfiguration.showByTaskStatus}
          setShowByTaskStatus={this.setShowByTaskStatus}
        />
      </QuickWidget>
    )
  }
}

registerWidgetType(WithReviewMetrics(ReviewStatusMetricsWidget), descriptor)
