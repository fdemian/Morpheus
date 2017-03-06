import { connect } from 'react-redux';
import LoginMenu from './LoginMenu';

const mapStateToProps = (state) => {    
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoginClick: () => {
	}	
  }
}

const ConnectedLoginMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginMenu)

export default ConnectedLoginMenu;