import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { WidgetDataTarget, registerWidgetType }
       from '../../../../../services/Widget/Widget'
import { searchProjects } from '../../../../../services/Project/Project'
import { extendedFind } from '../../../../../services/Challenge/Challenge'
import WithChallengeResultParents
       from '../../../HOCs/WithChallengeResultParents/WithChallengeResultParents'
import WithSearchResults
       from '../../../../HOCs/WithSearchResults/WithSearchResults'
import WithComboSearch from '../../../HOCs/WithComboSearch/WithComboSearch'
import SearchBox from '../../../../SearchBox/SearchBox'
import SvgControl from '../../../../Bulma/SvgControl'
import ProjectList from '../../ProjectList/ProjectList'
import QuickWidget from '../QuickWidget'
import MenuControl from '../MenuControl'
import messages from './Messages'
import './ProjectListWidget.css'

const descriptor = {
  widgetKey: 'ProjectListWidget',
  label: messages.label,
  targets: [WidgetDataTarget.projects],
  defaultWidth: 12,
  minWidth: 4,
  defaultHeight: 15,
  minHeight: 11,
  defaultConfiguration: {
    view: 'card',
    sortBy: ['name'],
  }
}

// Setup child components with needed HOCs.
const ProjectAndChallengeSearch = WithComboSearch(SearchBox, {
  'adminProjects': searchProjects,
  'adminChallenges': queryCriteria =>
    extendedFind({searchQuery: queryCriteria.query, onlyEnabled: false}, 1000),
})

export class ProjectListWidget extends Component {
  setView = view => {
    if (this.props.widgetConfiguration.view !== view) {
      this.props.updateWidgetConfiguration({view})
    }
  }

  viewControl = (view, icon) => (
    <SvgControl sym={icon ? icon : `${view}-icon`}
                className={{"is-active": this.props.widgetConfiguration.view === view}}
                onClick={() => this.setView(view)} />
  )

  render() {
    const viewControls = (
      <div className="project-list-widget__view-controls">
        <MenuControl>
          {this.viewControl("card", "cards-icon")}
          {this.viewControl("mixed")}
          {this.viewControl("list")}
        </MenuControl>
      </div>
    )

    const searchControl = this.props.projects.length === 0 ? null : (
      <ProjectAndChallengeSearch
        className="project-list-widget__searchbox"
        placeholder={this.props.intl.formatMessage(messages.searchPlaceholder)} />
    )

    return (
      <QuickWidget {...this.props}
                  className="project-list-widget"
                  widgetTitle={<FormattedMessage {...messages.title} />}
                  headerControls={searchControl}
                  menuControls={viewControls}>
        <ProjectList {...this.props}
                     projects={this.props.resultProjects}
                     expandedView={this.props.widgetConfiguration.view === 'card'}
                     mixedView={this.props.widgetConfiguration.view === 'mixed'}
                     showPreview={this.props.adminProjectsSearchActive} />
      </QuickWidget>
    )
  }
}

ProjectListWidget.propTypes = {
  widgetConfiguration: PropTypes.object,
  updateWidgetConfiguration: PropTypes.func.isRequired,
  filteredProjects: PropTypes.array,
}

const Widget =
  WithSearchResults( // for projects
    WithSearchResults( // for challenges
      WithChallengeResultParents(
        injectIntl(ProjectListWidget),
      ),
      'adminChallenges',
      'challenges',
      'filteredChallenges'
    ),
    'adminProjects',
    'filteredProjects',
    'resultProjects'
  )

registerWidgetType(Widget, descriptor)
