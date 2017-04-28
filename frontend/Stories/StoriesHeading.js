import React from 'react';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import Divider from 'material-ui/Divider';

const StoriesHeading = ({isAdminLoggedIn}) =>
{

   if(isAdminLoggedIn)
   {
       return(
       <div>

           <Link to="/stories/new">
               <FlatButton
                   hoverColor="gainsboro"
		           label="New story"
		           labelStyle={{'color': '#3b5998'}}
		           icon={<AddIcon  color='#3b5998' />}
		       />
	       </Link>

           <Link to="/categories">
               <FlatButton
                   hoverColor="gainsboro"
                   label="Categories"
                   labelStyle={{'color': '#3b5998'}}
                   icon={<AddIcon  color='#3b5998' />}
               />
           </Link>

       </div>
       );
   }
   else
   {
        return <Divider />;
   }

}

export default StoriesHeading;