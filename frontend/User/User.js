import React, { Component, PropTypes } from 'react';
import FetchingIndicator from '../Fetching/FetchingIndicator';
import cssModules from 'react-css-modules';
import Styles from './css/Users.scss';
import StoryList from '../Stories/StoryList';

class User extends Component {

 constructor(props) {
    super(props)
  }

  componentDidMount() {
    const userId = this.props.params.userId;
    this.props.onLoad(userId);
  }

  render() {

  const { isFetching, error, user, stories} = this.props;

  if(isFetching)
    return <FetchingIndicator />;

  if(error)
    return <p>There was an error fetching the user data.</p>;

  return(
   <div className="UserContainer">

     <div styleName="User">
	     <p>{user.name}</p>
	     <p>{user.status}</p>
	     <img src={user.avatar} alt={user.name} styleName="UserImage" />
     </div>

     <hr />

     <div className="StoriesContainer">
        <StoryList storiesList={stories} />
     </div>

   </div>
  )
 }
}

export default cssModules(User, Styles, { allowMultiple: true });
