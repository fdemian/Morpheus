import React, { Component, PropTypes } from 'react';
import FetchingIndicator from '../Fetching/FetchingIndicator';
import cssModules from 'react-css-modules';
import Styles from './css/Story.scss';
import Renderer from './DraftRenderer';
import CommentList from '../Comments/CommentList';
import StoryTags from './StoryTags';
import CommentSpace from './CommentSpace';

class Story extends Component {

 constructor(props)
 {
    super(props);
    this.postComment = this.props.postComment;
 }

 componentDidMount()
 {
   const storyId = this.props.match.params.storyId;
   this.props.onLoad(storyId);
 }

 render() {

  const { story, isLoggedIn, oauthProviders } = this.props;
  const {isFetching, error} = story;
  const { content, title, id, category, comments, tags } = story;

  if(isFetching)
    return (
    <div styleName="Loading">
	   <FetchingIndicator />
	</div>
    );
   
  if(error)
    return <p>There was an error fetching the content of this topic.</p>;
  
  const rawPostContent = JSON.parse(content);

  return(
  <div className="Story">

    <div>
	    <h1 styleName="StoryTitle">{title}</h1>
	</div>

	<br />
	<br />

	<div styleName="StoryContent">
	  <Renderer raw={rawPostContent} />
	</div>

	<hr styleName="Divider" />

	<div styleName="StoryTags">
	  <StoryTags tags={tags} />
	</div>

	<hr styleName="Divider" />

    <div styleName="StoryComments" id="comments" >
	  <CommentList comments={comments} loggedIn={isLoggedIn} />
	  <CommentSpace isLoggedIn={isLoggedIn} id={id} title={title} oauthProviders={oauthProviders} />
    </div>

  </div>
  );

 }
 
}

export default cssModules(Story, Styles, { allowMultiple: true });
