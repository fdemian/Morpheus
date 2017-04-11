import React from 'react';
import Chip from 'material-ui/Chip';
const chipStlye = {margin: 4};

const StoryTags = ({tags}) => {

 const data = tags.split(",");

  return(
   <div>
   {
     data.map((tag, i) => <Chip style={chipStlye}>{tag}</Chip>)
    }
   </div>
  );

}

export default StoryTags;