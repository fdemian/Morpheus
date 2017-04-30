import React from 'react';

const linkTextStyle = { 
 'color': 'blue',
 'marginTop': '13px',
 'marginLeft': '20px',
 'display': 'inline-block',
 'verticalAlign': 'top',
 'fontSize': '25px'
};

const CategorySpan = ({category, categoryHref}) => {

  const showCategory = category.id != -1;
  
  if(showCategory)
  {
	return(	
	<Link to={categoryHref} >
	    <span style={linkTextStyle}>
		  {category.name}
		</span>
	</Link>
	);
  }
  else
	return null;  
}