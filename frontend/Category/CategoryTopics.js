import React from 'react';
import FetchingIndicator from '../Fetching/FetchingIndicator';
import { Link } from 'react-router';

function normalize_string(str)
{
  return str.toLowerCase()
            .replace(/ /g, "-")
			.replace("?","")
			.replace("¿","");
}
 
const CategoryTopics = ({topics, isFetching }) => {

  if(isFetching)
	  return FetchingIndicator();

  return(
	<table>
		 <thead>
		  <tr>
			<th>Topic</th>
			<th>Author</th>
			<th>Replies</th>
			<th>Views</th>
		  </tr>
		  </thead>

		  <tbody>
			{topics.map((topic, i) =>
					<tr key={i}>
					  <td onClick={() => onTopicLinkClick(topic.id) }>
						<Link to={"/topics/" + topic.id + "/" + normalize_string(topic.name)}>
						 {topic.name}
						</Link>
					  </td>
					  <td onClick={() => onUserLinkClick(topic.author.name) }>
						<Link to={"/users/" + topic.author.name}>
						  <img src={topic.author.avatar} alt={topic.author.name} width="30px" height="30px" />
						 {topic.author.name}
						</Link>
					  </td>
					 <td>
						{topic.replies}
					 </td>
					  <td>
						{topic.views}
					 </td>
				  </tr>
				  )}
		</tbody>
    </table>
   );
}

export default CategoryTopics;
