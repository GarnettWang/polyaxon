import { connect, Dispatch } from 'react-redux';

import { getExperimentIndexName, sortByUpdatedAt } from '../constants/utils';
import { AppState } from '../constants/types';
import Jobs from '../components/jobs';
import { JobModel } from '../models/job';

import * as actions from '../actions/job';

export function mapStateToProps(state: AppState, params: any) {
  let experimentName = getExperimentIndexName(params.experiment.unique_name)
  let jobs: JobModel[] = [];
  state.experiments.byUniqueNames[experimentName].jobs.forEach(
    function (job: string, idx: number) {
      jobs.push(state.jobs.byUniqueNames[job]);
    });

  return {jobs: jobs.sort(sortByUpdatedAt)};
}

export interface DispatchProps {
  onCreate?: (job: JobModel) => any;
  onDelete?: (job: JobModel) => any;
  onUpdate?: (job: JobModel) => any;
  fetchData?: () => any;
}

export function mapDispatchToProps(dispatch: Dispatch<actions.JobAction>, params: any): DispatchProps {
  return {
    onCreate: (job: JobModel) => dispatch(actions.createJobActionCreator(job)),
    onDelete: (job: JobModel) => dispatch(actions.deleteJobActionCreator(job)),
    onUpdate: (job: JobModel) => dispatch(actions.updateJobActionCreator(job)),
    fetchData: () => dispatch(actions.fetchJobs(params.experiment.project_name, params.experiment.sequence))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
