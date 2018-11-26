import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import classNames from 'classnames'
import _map from 'lodash/map'
import AppErrors from '../../services/Error/AppErrors'
import WithErrors from '../HOCs/WithErrors/WithErrors'
import WidgetGrid from '../WidgetGrid/WidgetGrid'
import QuickTextBox from '../QuickTextBox/QuickTextBox'
import IconButton from '../IconButton/IconButton'
import ConfirmAction from '../ConfirmAction/ConfirmAction'
import BusySpinner from '../BusySpinner/BusySpinner'
import messages from './Messages'
import './WidgetWorkspace.css'

/**
 * Renders a widget workspace with the given configuration, expanding it with
 * default settings as needed. Only widgets compatible with the given data
 * targets will be shown or offered.
 *
 * @author [Neil Rotstan](https://github.com/nrotstan)
 */
export class WidgetWorkspace extends Component {
  state = {
    isEditingId: null,
  }

  startRenamingConfiguration = (conf=this.props.currentConfiguration) => {
    this.setState({
      isEditingId: conf.id,
      newConfigurationName: conf.label,
    })
  }

  setNewName = newConfigurationName => this.setState({newConfigurationName})

  renameConfiguration = () => {
    this.props.renameWorkspaceConfiguration(this.state.isEditingId,
                                            this.state.newConfigurationName)
    this.setState({isEditingId: null})
  }

  addConfiguration = () => {
    const newConf = this.props.addNewWorkspaceConfiguration()
    this.startRenamingConfiguration(newConf)
  }

  deleteConfiguration = () => {
    this.props.deleteWorkspaceConfiguration(this.props.currentConfiguration.id)
  }

  componentDidCatch(error, info) {
    // Mark this workspace configuration as broken. This can happen if a
    // widget has a problem. We'll be automatically switched to a working
    // layout (with a fresh one being generated if need be).
    this.props.markWorkspaceConfigurationBroken()
    this.props.addError(AppErrors.widgetWorkspace.renderFailure)
  }

  render() {
    if (!this.props.currentConfiguration) {
      return (
        <div className="pane-loading">
          <BusySpinner />
        </div>
      )
    }

    const tabs = _map(this.props.workspaceConfigurations, conf => {
      const tabLabel =
          conf.id !== this.state.isEditingId ? conf.label :
          <QuickTextBox small
                        text={this.state.newConfigurationName}
                        setText={this.setNewName}
                        done={this.renameConfiguration}
                        cancel={() => this.setState({isEditingId: null})} />

      return (
        <li key={conf.id}
            className={classNames({"is-active": conf.id === this.props.currentConfiguration.id})}>
          <a onClick={() => this.props.switchWorkspaceConfiguration(conf.id)}>{tabLabel}</a>
        </li>
      )
    })

    return (
      <div className="widget-workspace">
        <div className="widget-workspace__tab-row">
          <div className="widget-workspace__tab-row__tabs">
            <div className="tabs medium">
              <ul>{tabs}</ul>
            </div>
          </div>

          <div className="widget-workspace__tab-row__controls">
            <IconButton primary spriteName="pencil-icon"
                        title={this.props.intl.formatMessage(messages.renameConfigurationTooltip)}
                        onClick={() => this.startRenamingConfiguration()} />

            <IconButton primary spriteName="add-workspace-icon"
                        title={this.props.intl.formatMessage(messages.addConfigurationTooltip)}
                        onClick={this.addConfiguration} />

            <ConfirmAction>
              <IconButton danger spriteName="trash-icon"
                          title={this.props.intl.formatMessage(messages.deleteConfigurationTooltip)}
                          onClick={this.deleteConfiguration} />
            </ConfirmAction>
          </div>
        </div>
        <WidgetGrid {...this.props} workspace={this.props.currentConfiguration} />
      </div>
    )
  }
}

WidgetWorkspace.propTypes = {
  name: PropTypes.string.isRequired,
  targets: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  defaultConfiguration: PropTypes.func.isRequired,
}

export default WithErrors(injectIntl(WidgetWorkspace))
