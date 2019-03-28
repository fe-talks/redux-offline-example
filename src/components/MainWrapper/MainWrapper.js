import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class MainWrapper extends Component {
  static propTypes = {
    some: PropTypes.string,
    setSome: PropTypes.func.isRequired,
  };
  static defaultProps = {};
  static displayName = 'MainWrapper';

  timeout = null;

  render() {
    return (
      <div className={classNames('main-wrapper', this.props.className)}>
        MainWrapper content some: {this.props.some}
      </div>
    );
  }

  componentDidMount() {
    this.timeout = setTimeout(() => this.props.setSome('some text'), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
}
