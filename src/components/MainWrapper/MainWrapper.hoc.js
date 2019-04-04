import { connect } from 'react-redux';

import { MainWrapper } from './MainWrapper';
import { getSome, setSome } from 'store/data/firstData';
import { addPost, getPostsData, getPostsIds } from 'store/data/posts';

const mapStateToProps = state => ({
  some: getSome(state),
  postsData: getPostsData(state),
  postsIds: getPostsIds(state),
});
const mapDispatchToProps = {
  setSome,
  addPost,
};

export const MainWrapperHoc = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainWrapper);

MainWrapperHoc.displayName = 'MainWrapperHoc';
