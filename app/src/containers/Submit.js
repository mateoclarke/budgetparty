import { connect } from 'react-redux'
import Submit from '../components/Submit'

import { updateServiceStatus } from '../actions/services'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    onReturnToDashboard: (service) => {
      const nextIndex = service.index + 1;
      dispatch(updateServiceStatus(nextIndex, 'ready'));
      console.log(`updateServiceStatus to "ready" for ${nextIndex}`);
    },
  }
}

const SubmitContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Submit)

export default SubmitContainer
