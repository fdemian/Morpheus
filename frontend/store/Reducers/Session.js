import
{
  NEW_NOTIFICATION,
  REQUEST_NOTIFICATIONS,
  RECEIVE_NOTIFICATIONS,
  REQUEST_NOTIFICATIONS_FAILURE
} from '../../App/Actions';

import
{
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from '../../Authentication/Actions';

import
{
   USERNAME_CHANGED,
   NAME_CHANGED,
   EMAIL_CHANGED,
   PASSWORD_CHANGED,
   REGISTER_FILL_DATA,
   REGISTER_FILL_SUCCESS,
   REGISTER_FILL_FAILURE,
   REGISTER_START,
   REGISTER_SUCCESS,
   REGISTER_FAILURE
 } from '../../Register/Actions';

import
{
   MARK_NOTIFICATION_READ ,
   MARK_NOTIFICATION_READ_SUCCESS,
   MARK_NOTIFICATION_READ_FAILURE
}
from '../../Toolbar/NavbarMenues/AccountMenu/NotificationsMenu/Actions';

const initialState = {
  loggedIn: false,
  isFetching: false,
  user : {
    name: "",
    username: "",
    role: "",
    email: "",
    avatar: "",
    link: ""
  },
  notifications: [],
  error: false,
  token: "",
  authType: "",
  password: ""
}

export function session(state = initialState, action) {

  switch (action.type) {

    /* Fill register data */
    case REGISTER_FILL_DATA:
      return state;
    case REGISTER_FILL_SUCCESS:
      return {...state, user: action.data.user, authType: action.data.authType, token: action.data.token }
    case REGISTER_FILL_FAILURE:
      return {...state, error: true}

    /* State changed */
    case USERNAME_CHANGED:
    case NAME_CHANGED:
    case EMAIL_CHANGED:
      return { ...state, user: action.data };

    /* Password changed */
    case PASSWORD_CHANGED:
      return { ...state, password: action.data };

    /* Register user */
    case REGISTER_START:
 	    return { ...state, isFetching: true }
    case REGISTER_SUCCESS:
 	    return { ...state, isFetching: false, error: false}
    case REGISTER_FAILURE:
      return { ...state, isFetching: false, error: true};

    /* Authenticate user (login) */
    case AUTH_START:
	    return { ...state, isFetching: true };
    case AUTH_SUCCESS:
        const jwt_token = action.data.token;
        const decoded = JSON.parse(window.atob(jwt_token.split(".")[1].replace('-', '+').replace('_', '/')));
	    return { ...state,
               user: decoded.user,
               token: jwt_token,
	           authType: decoded.authType,
               isFetching: false,
               loggedIn:true,
               authType: decoded.type
             };
    case AUTH_FAILURE:
      return { ...state, isFetching: false, error: true};

    /* Logout */
    case LOGOUT_START:
	    return { ...state, isFetching: true }
    case LOGOUT_SUCCESS:
	    return initialState;
    case LOGOUT_FAILURE:
      return { ...state, isFetching: false, error: true};

    /* Notifications.  */
    case NEW_NOTIFICATION:
      const items = state.notifications.concat(action.data);
      return { ...state, notifications: items};
    case REQUEST_NOTIFICATIONS:
 	  return state;
    case RECEIVE_NOTIFICATIONS:
      const _items = state.notifications.concat(action.data);
      return { ...state, notifications: _items};
    case REQUEST_NOTIFICATIONS_FAILURE:
      return { ...state, isFetching: false, error: true};

    /* Mark notification as read */
    case MARK_NOTIFICATION_READ:
       return state;
    case MARK_NOTIFICATION_READ_SUCCESS:
       const _notifications = state.notifications;
       //return { ...state, notifications: _items};*/
       console.log(action.data);
       return state;
    case MARK_NOTIFICATION_READ_FAILURE:
       return state;
    default:
      return state;

  }

   return state;
}

export default session;
