import { connect } from 'react-redux';
import NotificationsMenu from './NotificationsMenu';
import {initializeNotifications} from '../../../App/Actions.js';

const mapStateToProps = (state) => {
  return {
	 loggedIn: state.session.loggedIn,
     token : state.session.token,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onInit: (loggedIn, token) => {
	  dispatch(initializeNotifications());
	}
  }
}

const ConnectedNotificationsMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsMenu)

export default ConnectedNotificationsMenu;
