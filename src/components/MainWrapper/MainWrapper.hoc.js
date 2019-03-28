import { connect } from 'react-redux';

import { MainWrapper } from './MainWrapper';
import { getSome, setSome } from 'store/data/firstData';

const mapStateToProps = state => ({
  some: getSome(state),
});
const mapDispatchToProps = {
  setSome,
};

export const MainWrapperHoc = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainWrapper);

MainWrapperHoc.displayName = 'MainWrapperHoc';
