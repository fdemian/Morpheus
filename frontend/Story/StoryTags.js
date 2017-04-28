import React from 'react';
import Chip from 'material-ui/Chip';
const chipStlye = {margin: 4};

const StoryTags = ({tags}) => {

  if(tags == null)
    return(
     <div>
        <p>No tags</p>
     </div>
    );

  const data = tags.split(",");

  return(
   <div>
   {data.map((tag, i) => <Chip style={chipStlye} key={i}>{tag}</Chip>)}
   </div>
  );

}

export default StoryTags;