import React from 'react';
import Paper from 'material-ui/Paper';
import StoryElement from './StoryElement';

const StoryList = ({storiesList, loggedIn, deleteFn, editFn}) => (
<div>  
 {storiesList.map((story, i) =>  
  <div key={i}>	  
    <StoryElement story={story} loggedIn={loggedIn} deleteFn={deleteFn} editFn={editFn} />
  </div>
 )}
</div>
);

export default StoryList;
