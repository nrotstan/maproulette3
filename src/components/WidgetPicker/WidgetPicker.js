import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import _map from 'lodash/map'
import _isObject from 'lodash/isObject'
import WithDeactivateOnOutsideClick
       from '../HOCs/WithDeactivateOnOutsideClick/WithDeactivateOnOutsideClick'
import DropdownButton from '../Bulma/DropdownButton'
import messages from './Messages'
import './WidgetPicker.css'

const DeactivatableDropdownButton = WithDeactivateOnOutsideClick(DropdownButton)

/**
 * WidgetPicker renders a dropdown containing the widgets provided by
 * the given availableWidgets function prop.
 *
 * @author [Neil Rotstan](https://github.com/nrotstan)
 */
export class WidgetPicker extends Component {
  widgetSelected = ({key}) => {
    this.props.onWidgetSelected(key)
  }

  render() {
    const menuOptions =
      _map(this.props.availableWidgets(), descriptor => ({
        key: descriptor.widgetKey,
        text: _isObject(descriptor.label) ?
              this.props.intl.formatMessage(descriptor.label) :
              (descriptor.label || descriptor.widgetKey),
      }))

    if (menuOptions.length === 0) {
      return null
    }

    return (
      <DeactivatableDropdownButton {...this.props}
                                   className="widget-picker"
                                   options={menuOptions}
                                   onSelect={this.widgetSelected}>
        <a className="button is-rounded is-outlined is-secondary">
          <FormattedMessage {...messages.pickerLabel} />
          <div className="basic-dropdown-indicator" />
        </a>
      </DeactivatableDropdownButton>
    )
  }
}

WidgetPicker.propTypes = {
  /** Returns widgets to be made available in picker */
  availableWidgets: PropTypes.func.isRequired,
  /** Invoked when a widget is selected by the user */
  onWidgetSelected: PropTypes.func.isRequired,
}

export default injectIntl(WidgetPicker)
