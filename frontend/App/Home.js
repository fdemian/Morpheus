import React from 'react';
import Stories from '../Stories/Container';

const Home = (props) => {

 return( 
 <div>
    <Stories history={props.history} />
 </div>
 );
		
}
export default Home;
