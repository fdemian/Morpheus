import { connect } from 'react-redux';
import NotificationsMenu from './NotificationsMenu';
import {initializeNotifications, getNotifications} from '../../../App/Actions.js';

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
	  dispatch(initializeNotifications());
	  console.log(getNotifications);
	  console.log(token);
	  dispatch(getNotifications(token));
	}
  }
}

const ConnectedNotificationsMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsMenu)

export default ConnectedNotificationsMenu;
