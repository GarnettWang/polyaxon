import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter } from 'react-router-dom';
import * as _ from 'lodash';

import { AppState } from '../constants/types';
import { ProjectModel } from '../models/project';
import ProjectDetail from '../components/projectDetail';
import * as actions from '../actions/project';
import { getProjectUniqueName } from '../constants/utils';

export function mapStateToProps(state: AppState, params: any) {
  let projectUniqueName = getProjectUniqueName(
    params.match.params.user,
    params.match.params.projectName);
  return _.includes(state.projects.uniqueNames, projectUniqueName) ?
      {project: state.projects.byUniqueNames[projectUniqueName]} :
      {project: null};
}

export interface DispatchProps {
  onDelete?: (project: ProjectModel) => any;
  fetchData?: () => any;
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ProjectAction>, params: any): DispatchProps {
  return {
    onDelete: (project: ProjectModel) => dispatch(actions.deleteProject(project)),
    fetchData: () => dispatch(actions.fetchProject(params.match.params.user, params.match.params.projectName))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectDetail));
