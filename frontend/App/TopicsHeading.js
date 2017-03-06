import React from 'react';

const TopicsHeadingStyles = {
	 marginLeft: '500px'
}

const TopicsHeading = () => {
  
  return(  
  <div className="topics-menu" style={TopicsHeadingStyles}>	    

	<span>
	  Category:
      <select>
        <option value="1">General</option>
        <option value="3">The Psychyatric</option>
        <option value="4">Outings</option>
        <option value="5">Relationship Advice</option>
        <option value="6">Food</option>
      </select>
    </span>
		
    <button type="button">All categories</button>
    <button type="button">Latest</button>	
		
  </div>
  );
  
}

export default TopicsHeading;