import React, { Component, PropTypes } from 'react';
import FetchingIndicator from '../Fetching/FetchingIndicator';
import CategoryTopics from './CategoryTopics';

class Category extends Component {

 constructor(props)
 {
    super(props)
 }
   
 componentDidMount()
 {
   const categoryId = this.props.match.params.categoryId;
   this.props.onLoad(categoryId);
 }

 render() {

  const { isFetching, error, category} = this.props;

  if(isFetching)
    return <FetchingIndicator />;

  if(error)
    return <p>There was an error fetching the category.</p>;

  return(
	<div className="Category">
		<h1 style={{textAlign: 'center'}}>{category.category.name}</h1>
		<hr />
	   <CategoryTopics topics={category.topics.items} isFetching={category.isFetching} />
    </div>
   )
 }
}

export default Category;
