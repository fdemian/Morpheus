import signIn from '../Authentication/Actions';
import sendContent from '../store/callApiHelpers';

export default function login(username, password) {
   const _type = "database";
   return signIn(_type, null, "", username, password);
}
