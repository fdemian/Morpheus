import { connect } from 'react-redux';
import NotificationsMenu from './NotificationsMenu';
import {initializeNotifications} from '../../../App/Actions.js';

const mapStateToProps = (state) => {
  return {
	 loggedIn: state.session.loggedIn,
	 user: state.session.user,
     token : state.session.token,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onInit: (loggedIn, token, user) => {
	  dispatch(initializeNotifications())
	}
  }
}

const ConnectedNotificationsMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsMenu)

export default ConnectedNotificationsMenu;
