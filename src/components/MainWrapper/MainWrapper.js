import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uuid from 'uuid/v4';

export class MainWrapper extends Component {
  static propTypes = {
    some: PropTypes.string,
    setSome: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired,
    postsIds: PropTypes.array.isRequired,
    postsData: PropTypes.object.isRequired,
  };
  static defaultProps = {};
  static displayName = 'MainWrapper';

  timeout = null;

  render() {
    return (
      <div className={classNames('main-wrapper', this.props.className)}>
        MainWrapper content some: {this.props.some}
        <br />
        <button onClick={this.handleClick}>Add new post</button>
        <div>
          <h5>Posts list:</h5>
          {this.props.postsIds.map(postId => (
            <div key={postId}>
              {JSON.stringify(this.props.postsData[postId])}
            </div>
          ))}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.timeout = setTimeout(() => this.props.setSome('some text'), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handleClick = () => {
    // in real app it should be in some service which creates post object
    this.props.addPost({
      title: 'Post',
      content: Math.random(),
      internalId: uuid(), // we assume that BE creates ids so we will overwrite it later
    });
  };
}
