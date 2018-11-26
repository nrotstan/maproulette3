import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import _map from 'lodash/map'
import _compact from 'lodash/compact'
import ReactGridLayout, { WidthProvider } from 'react-grid-layout'
import { widgetComponent } from '../../services/Widget/Widget'
import WithWidgetManagement
       from '../HOCs/WithWidgetManagement/WithWidgetManagement'
import WidgetPicker from '../WidgetPicker/WidgetPicker'
import "../../../node_modules/react-grid-layout/css/styles.css"
import "../../../node_modules/react-resizable/css/styles.css"
import './WidgetGrid.css'

const GridLayout = WidthProvider(ReactGridLayout)

export class WidgetGrid extends Component {
  render() {
    const GridFilters = this.props.filterComponent

    const widgetInstances =
      _compact(_map(this.props.workspace.widgets, (widgetConfiguration, index) => {
        const WidgetComponent = widgetComponent(widgetConfiguration)
        if (!WidgetComponent) {
          console.log(`No widget "${widgetConfiguration.widgetKey || widgetConfiguration}" found. Ignoring.`)
          return null
        }

        if (!this.props.workspace.layout[index]) {
          console.log("No layout found at index", index, `for "${widgetConfiguration.widgetKey}". Ignoring.`)
          return null
        }

        return (
          <div key={this.props.workspace.layout[index].i}>
            <WidgetComponent {...this.props}
                            widgetLayout={this.props.workspace.layout[index]}
                            widgetConfiguration={_get(widgetConfiguration, 'defaultConfiguration', {})}
                            updateWidgetConfiguration={conf => this.props.updateWidgetConfiguration(index, conf)}
                            removeWidget={() => this.props.removeWidget(index)} />
          </div>
        )
      }))

    return (
      <div className="widget-grid">
        <div className="widget-grid__controls">
          {GridFilters && <GridFilters {...this.props} />}
          <WidgetPicker {...this.props} isRight onWidgetSelected={this.props.addWidget} />
        </div>

        <GridLayout className="widget-grid"
                    cols={this.props.workspace.cols || 12}
                    rowHeight={this.props.workspace.rowHeight || 30}
                    layout={this.props.workspace.layout || []}
                    onLayoutChange={this.props.onLayoutChange}
                    draggableHandle=".widget__header__title-row__title"
                  >
          {widgetInstances}
        </GridLayout>
      </div>
    )
  }
}

WidgetGrid.propTypes = {
  workspace: PropTypes.shape({
    widgets: PropTypes.array.isRequired,
    cols: PropTypes.number,
    rowHeight: PropTypes.number,
    layout: PropTypes.array,
  }).isRequired,
  onLayoutChange: PropTypes.func.isRequired,
}

export default WithWidgetManagement(WidgetGrid)
