import React from 'react';
import Paper from 'material-ui/Paper';
import StoryElement from './StoryElement';

const StoryList = ({storiesList, loggedIn, deleteFn}) => (
<div>  
 {storiesList.map((story, i) =>  
  <div key={i}>	  
    <StoryElement story={story} loggedIn={loggedIn} deleteFn={deleteFn} />
  </div>
 )}
</div>
);

export default StoryList;
