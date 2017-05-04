import React from 'react';

const QuoteBlock = ({text, source}) => {

 if(source == null)
   source = "";

 return(
 <blockquote cite={source}>
     {text}
  </blockquote>
 );

}

export default QuoteBlock;