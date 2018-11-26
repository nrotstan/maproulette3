import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import WithDeactivateOnOutsideClick
       from '../HOCs/WithDeactivateOnOutsideClick/WithDeactivateOnOutsideClick'
import SvgSymbol from '../SvgSymbol/SvgSymbol'
import SimpleDropdown from '../Bulma/SimpleDropdown'
import MenuControl from './MenuControl'
import MenuControlDivider from './MenuControlDivider'

const DeactivatableDropdown = WithDeactivateOnOutsideClick(SimpleDropdown)

/**
 * QuickWidget makes creation of widgets easier by encapsulating the needed
 * structure for consistent display of common items (titles, header controls,
 * menu controls, scrollable content, etc).
 *
 * Note that the primary widget content should be provided as a child
 *
 * @see See Widgets/README.md for details on creating custom widgets
 *
 * @author [Neil Rotstan](https://github.com/nrotstan)
 */
export default class QuickWidget extends Component {
  render() {
    return (
      <div className={classNames("widget", this.props.className)}>
        <div className={classNames("widget__header",
                                   {"widget__header--has-header-content": !!this.props.headerContent})}>
          <div className="widget__header__title-row">
            <div className="widget__header__title-row__title">
              <h2 className="subtitle">{this.props.widgetTitle}</h2>
            </div>

            <div className="widget__header__title-row__controls">
              <div className="widget__header__title-row__controls--left">
                {this.props.leftHeaderControls}
              </div>

              <div className="widget__header__title-row__controls--center">
                {this.props.headerControls}
              </div>

              <div className="widget__header__title-row__controls--right">
                {this.props.rightHeaderControls}
              </div>

              <DeactivatableDropdown
                  isRight
                  className="widget__header__title-row__controls__menu-control"
                  label={<SvgSymbol className="widget__header__title-row__controls__menu-control__icon"
                                    sym="cog-icon" viewBox="0 0 20 20" />}>
                {this.props.menuControls &&
                  <React.Fragment>
                    {this.props.menuControls}

                    <MenuControlDivider />
                  </React.Fragment>
                }

                <MenuControl>
                  <a className="is-danger" onClick={this.props.removeWidget}>Remove</a>
                </MenuControl>
              </DeactivatableDropdown>
            </div>
          </div>

          {this.props.headerContent}
        </div>

        <div className="widget__content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

QuickWidget.propTypes = {
  /** Title of widget */
  widgetTitle: PropTypes.node.isRequired,
  /** Optional controls to display in widget header next to the title */
  headerControls: PropTypes.element,
  /** Optional controls to display in widget drop-down menu */
  menuControls: PropTypes.element,
  /** Optional, additional content to display in widget header */
  headerContent: PropTypes.element,
}
