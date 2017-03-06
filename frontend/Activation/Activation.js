import React, { Component } from 'react';
import FetchingIndicator from '../Fetching/FetchingIndicator';
import { Link } from 'react-router';

class Activation extends Component {

 constructor(props)
 {
    super(props);
    this.postComment = this.props.postComment;
 }

 componentDidMount()
 {
   const {code} = this.props.params;
   this.props.onLoad(code);
 }

 render() {

  const {isFetching, error, success} = this.props;

  if(error)
    return (
    <div>
        <h1>An error ocurred while activating your account.</h1>
        <p>
           Either no user exists for the activation code specified or the code introduced was invalid.
        </p>
        <p>
           Please, check your mail's inbox and verify that the link you followed was sent by us.
        </p>
    </div>
    );

  if(isFetching)
    return (
    <div>
	   <FetchingIndicator />
	</div>
	);

  if(isFetching)
     return (
     <div styleName="Loading">
	   <FetchingIndicator />
	 </div>
  );

  return(
  <div>
    <h1>Account sucessfully activated</h1>
    <p>
        Congratulations! You've sucessfully activated your account.
    </p>
    <p>
       Now you can <Link to="/login">log in</Link> or go the <Link to="/">main site</Link>.
    </p>
  </div>
  );

 }
}

export default Activation;