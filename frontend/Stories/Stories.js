import React, { Component, PropTypes } from 'react';
import FetchingIndicator from '../Fetching/FetchingIndicator';
import StoryList from './StoryList';
import cssModules from 'react-css-modules';
import Styles from './Stories.scss';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import {withRouter} from 'react-router';

class Stories extends Component {

 constructor(props) { super(props) }

 contextTypes:
 {
    router: React.PropTypes.func
 }

 editFn(id)
 {
    const { router } = this.props;
    const _storyToEdit = this.props.stories.filter(s => s.id == id)[0];
    this.props.onEditClick(_storyToEdit.id, _storyToEdit.name, _storyToEdit.category, _storyToEdit.content);

    router.replace('/stories/new');
 }

 componentDidMount()
 {
   this.props.onLoad();
   this.editFn = this.editFn.bind(this);
 }

 render()
 {

    const { isFetching, error, stories, loggedIn, userRole, onDelete} = this.props;

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

	    <p styleName="MainSectionText">Stories</p>

	    {loggedIn && userRole == "author" ?
	      <div styleName="StoriesHeading">
             <Link to="/stories/new">
		        <FlatButton
                   hoverColor="gainsboro"
		           label="New story"
		           labelStyle={{'color': '#3b5998'}}
		           icon={<AddIcon  color='#3b5998' />}
		        />
		     </Link>
	      </div>
	    :
	    <Divider />
	    }

        <StoryList storiesList={stories} loggedIn={loggedIn} deleteFn={onDelete} editFn={this.editFn} />

    </div>
    );

  }
}


const storiesComponent = cssModules(Stories, Styles, { allowMultiple: true });
export default withRouter(storiesComponent, { withRef: true });

