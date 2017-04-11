import React, { Component, PropTypes } from 'react';
import FetchingIndicator from '../Fetching/FetchingIndicator';
import cssModules from 'react-css-modules';
import Styles from './css/Story.scss';
import Renderer from './DraftRenderer';
import CommentBox from '../Comments/Container';
import CommentList from '../Comments/CommentList';
import CommentLogin from '../Comments/CommentLogin';

class Story extends Component {

 constructor(props)
 {
    super(props);
    this.postComment = this.props.postComment;
 }

 componentDidMount()
 {
   const storyId = this.props.params.storyId;
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
  const CommentComposer = isLoggedIn ? <CommentBox /> :
                                       <CommentLogin storyId={id} storyName={title} providers={oauthProviders} /> ;

  console.log(tags);


  return(
  <div className="Story">
	<h1 styleName="StoryTitle">{title}</h1>
	<br />
	<br />	
	<div styleName="StoryContent">
	  <Renderer raw={rawPostContent} />
	</div>
	<hr styleName="Divider" />
    <div styleName="StoryComments" id="comments" >
	  <CommentList comments={comments} loggedIn={isLoggedIn} />
	  {CommentComposer}
    </div>
  </div>
  );
 }
 
}

export default cssModules(Story, Styles, { allowMultiple: true });
