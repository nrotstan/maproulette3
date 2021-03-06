import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import _get from 'lodash/get'
import WithCurrentUser from '../HOCs/WithCurrentUser/WithCurrentUser'
import UserActivityTimeline
       from '../ActivityTimeline/UserActivityTimeline/UserActivityTimeline'
import SignInButton from '../SignInButton/SignInButton'
import messages from './Messages'
import SavedTasks from './SavedTasks/SavedTasks'
import SavedChallenges from './SavedChallenges/SavedChallenges'
import './UserProfile.css'

export class UserProfile extends Component {
  render() {
    if (!_get(this.props, 'user.isLoggedIn')) {
      return (
        <div className="user-profile">
          <SignInButton className="user-profile--signin" {...this.props} />
        </div>
      )
    }

    return (
      <div className="user-profile columns">
        <div className="column">
          <section className="user-profile__personal">
            <figure className="user-profile__personal--avatar image is-128x128">
              <img src={this.props.user.osmProfile.avatarURL} alt="Avatar" />
            </figure>

            <div className="user-profile__personal--display-name">
              {this.props.user.osmProfile.displayName}
            </div>
          </section>

          <section className="user-profile__activity">
            <UserActivityTimeline activity={this.props.user.activity} />
          </section>
        </div>

        <div className="column">
          <section className="user-profile__saved-challenges">
            <SavedChallenges {...this.props} />
          </section>

          <section className="user-profile__saved-tasks">
            <SavedTasks {...this.props} />
          </section>

          <section className="user-profile__api-key">
            <h2 className="subtitle">
              <FormattedMessage {...messages.apiKey} />
            </h2>

            <pre className="user-profile__api-key--current-key">
              {this.props.user.apiKey}
            </pre>
          </section>
        </div>
      </div>
    )
  }
}

export default WithCurrentUser(injectIntl(UserProfile))
