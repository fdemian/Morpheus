import React, { Component } from 'react';
import FetchingIndicator from '../Fetching/FetchingIndicator';
import StoryList from './StoryList';
import cssModules from 'react-css-modules';
import Styles from './Stories.scss';
import { Link } from 'react-router-dom';
import StoriesHeading from './StoriesHeading';


class Stories extends Component {

 constructor(props) {
    super(props)
 }

 editFn(id, history)
 {
    const _storyToEdit = this.props.stories.filter(s => s.id == id)[0];
    this.props.onEditClick(_storyToEdit);

    history.push('/stories/new');
 }

 componentDidMount()
 {
   this.props.onLoad();
   this.editFn = this.editFn.bind(this);
 }

 render()
 {

    const { isFetching, error, stories, loggedIn, userRole, onDelete, history} = this.props;
    const adminLoggedIn = (loggedIn && userRole == "author");

    if(isFetching)
      return (
      <div styleName="Loading">
	     <FetchingIndicator />
	  </div>
      );

    if(error)
      return <p>There was an error fetching your posts</p>;

    if(stories)
      return (
      <div styleName="StoriesContainer">

        <div>
	        <p styleName="MainSectionText">Stories</p>
        </div>

        <div styleName="StoriesHeading">
	        <StoriesHeading isAdminLoggedIn={adminLoggedIn} />
	    </div>

	    <div>
           <StoryList
              storiesList={stories}
              history={history}
              loggedIn={loggedIn}
              deleteFn={onDelete}
              editFn={this.editFn}
           />
        </div>

      </div>
      );

  }
}

export default cssModules(Stories, Styles, { allowMultiple: true });
