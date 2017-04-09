import { _PUT } from  '../../../../store/callApiHelpers';

export const MARK_NOTIFICATION_READ = 'MARK_NOTIFICATION_READ';
export const MARK_NOTIFICATION_READ_SUCCESS = 'MARK_NOTIFICATION_READ_SUCCESS';
export const MARK_NOTIFICATION_READ_FAILURE = 'MARK_NOTIFICATION_READ_FAILURE';

export default function markAsRead(notification) {

   notification.read = true;
   const endpoint = "alerts";
   const types = [MARK_NOTIFICATION_READ, MARK_NOTIFICATION_READ_SUCCESS, MARK_NOTIFICATION_READ_FAILURE];
   const content = JSON.stringify(notification);

   return (dispatch, getState) => {
      const state = getState();
      const token = state.session.token;

      dispatch(_PUT(endpoint, types, content, token));
    }
}