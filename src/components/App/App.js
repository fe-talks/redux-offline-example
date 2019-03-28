import React from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';

export function App(props) {
  return <div className={classNames('app', props.className)}>App content</div>;
}

App.defaultProps = {};

App.propTypes = {};

App.displayName = 'App';
