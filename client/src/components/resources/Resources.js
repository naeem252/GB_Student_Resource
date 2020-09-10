import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Resource from './Resource';
import * as actions from '../../action/resourcesAction';
import BackDrop from '../backDrop/BackDrop';
import Divider from '@material-ui/core/Divider';

function Resources({ getResources, resources, loading }) {
  useEffect(() => {
    if (resources.length <= 0) {
      getResources();
    }
  }, [getResources]);

  return (
    <Fragment>
      {loading && <BackDrop open={loading} />}
      <div className='container'>
        <div className='resources-container'>
          {resources.length <= 0 ? (
            <h1>No Resource Found</h1>
          ) : (
            resources.map((resource) => {
              return (
                <Fragment key={resource._id}>
                  <Resource resource={resource} />
                  <Divider />
                </Fragment>
              );
            })
          )}
        </div>
      </div>
    </Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    resources: state.resources.resources,
    loading: state.resources.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getResources: () => dispatch(actions.getResources()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Resources);
