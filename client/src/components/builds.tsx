import * as React from 'react';
import * as _ from 'lodash';

import * as actions from '../actions/build';
import Build from './build';
import { BuildModel } from '../models/build';
import { DEFAULT_FILTERS } from './filters/constants';
import PaginatedList from './paginatedList';
import { EmptyList } from './emptyList';
import BuildHeader from './buildHeader';

export interface Props {
  isCurrentUser: boolean;
  builds: BuildModel[];
  count: number;
  onCreate: (build: BuildModel) => actions.BuildAction;
  onUpdate: (build: BuildModel) => actions.BuildAction;
  onDelete: (build: BuildModel) => actions.BuildAction;
  fetchData: (offset?: number, query?: string, sort?: string) => actions.BuildAction;
}

export default class Builds extends React.Component<Props, Object> {
  public render() {
    const builds = this.props.builds;
    const listBuilds = () => {
      return (
        <ul>
          {builds.filter(
            (xp: BuildModel) => _.isNil(xp.deleted) || !xp.deleted
          ).map(
            (build: BuildModel) =>
              <li className="list-item" key={build.unique_name}>
                <Build build={build} onDelete={() => this.props.onDelete(build)}/>
              </li>)}
        </ul>
      );
    };
    return (
      <PaginatedList
        count={this.props.count}
        componentList={listBuilds()}
        componentHeader={BuildHeader()}
        componentEmpty={
          EmptyList(
            this.props.isCurrentUser,
            'build',
            'build',
            'polyaxon run --help')}
        filters={DEFAULT_FILTERS}
        fetchData={this.props.fetchData}
      />
    );
  }
}
