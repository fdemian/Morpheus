import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import format_title_string from '../../utils/formats.js';

const linkTextStyle = { 
 'color': 'blue',
 'marginTop': '13px',
 'marginLeft': '20px',
 'display': 'inline-block',
 'verticalAlign': 'top',
 'fontSize': '25px'
};

const CategorySpan = ({category}) => {
  
  const href = "/categories/" + category.id + "/" + category.name;  
  const showCategory = category.id != -1;
  
  if(showCategory)
  {
	return(	
	<Link to={href} >
	  <span style={linkTextStyle}>
         {category.name}
	   </span>
	</Link>
	);
  }
  else
	return null;  
}

export default CategorySpan;