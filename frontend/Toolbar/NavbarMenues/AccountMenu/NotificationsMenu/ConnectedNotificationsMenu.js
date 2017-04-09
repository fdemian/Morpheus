import { connect } from 'react-redux';
import NotificationsMenu from './NotificationsMenu';
import {initializeNotifications, getNotifications} from '../../../../App/Actions.js';
import markAsRead from './Actions.js';

const mapStateToProps = (state) => {
  return {
     notifications: state.session.notifications,
     notificationsEnabled: state.app.notificationsEnabled
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onInit: (loggedIn, token, user) => {
	  dispatch(initializeNotifications());
	  dispatch(getNotifications());
	},
	onRead: (notification) => {
	  dispatch(markAsRead(notification));
	}
  }
}

const ConnectedNotificationsMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsMenu)

export default ConnectedNotificationsMenu;
