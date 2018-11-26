import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import VirtualChallengeNameLink
       from '../VirtualChallengeNameLink/VirtualChallengeNameLink'
import ChallengeNameLink from '../ChallengeNameLink/ChallengeNameLink'
import OwnerContactLink from '../OwnerContactLink/OwnerContactLink'
import './ChallengeInfoSummary.css'

/**
 * ChallengeInfoSummary displays various pieces of summary information about
 * the parent challenge of the given task, such as its name, parent project
 * name, owner contact, and the current virtual challenge name (if any).
 *
 * @author [Neil Rotstan](https://github.com/nrotstan)
 */
export default class ChallengeInfoSummary extends Component {
  render() {
    return (
      <div className="challenge-info-summary">
        <VirtualChallengeNameLink {...this.props} />

        <h2 className="challenge-info-summary__challenge-name">
          <ChallengeNameLink {...this.props} />
        </h2>

        <div className="challenge-info-summary__project-name">
          {_get(this.props.task, 'parent.parent.displayName')}
        </div>

        <OwnerContactLink {...this.props} />
      </div>
    )
  }
}

ChallengeInfoSummary.propTypes = {
  task: PropTypes.object,
}
