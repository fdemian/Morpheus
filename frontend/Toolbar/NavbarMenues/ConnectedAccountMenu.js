import { connect } from 'react-redux';
import AccountMenu from './AccountMenu';
import {signOut} from '../../AuthHelper/Actions';

const mapStateToProps = (state) => {    
  return {
	 authType: state.session.type,
     token : state.session.token	  
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogoutClick: () => {
	  dispatch(signOut());
	}	
  }
}

const ConnectedAccountMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountMenu)

export default ConnectedAccountMenu;