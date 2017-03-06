import React from 'react';
import cssModules from 'react-css-modules';
import Styles from './Styles.scss';

class Categories extends React.Component {

 constructor(props){
    super(props)

	this.state = { categoryMenuVisible: true, newCategoryName: ""};
	this.onLoad = this.props.onLoad;
	this.onDelete = this.props.onDelete;
	this.onCreate = this.props.onCreate;

	this.toggleCategoryMenu = this.toggleCategoryMenu.bind(this);
	this.newCategoryChange = this.newCategoryChange.bind(this);
	this.createCategory = this.createCategory.bind(this);
 }

 componentDidMount(){
   	this.onLoad();
 }

 toggleCategoryMenu(){
	 this.setState({categoryMenuVisible: !this.state.categoryMenuVisible});
 }

 newCategoryChange(event){
		this.setState({newCategoryName: event.target.value});
 }

 createCategory(){
	 this.toggleCategoryMenu();
	 this.onCreate(this.state.newCategoryName);
 }

 render() {

	const {categories, isFetching, error} = this.props;
	const buttonStyle = this.state.categoryMenuVisible ? "Visible" : "Invisible";
	const inputStyle = this.state.categoryMenuVisible ? "Invisible" : "Visible";

	return (
 	<div>

		<div>

			 <div styleName={buttonStyle}>
			 		<button type="button" onClick={this.toggleCategoryMenu}>
					+ New category
					</button>
			 </div>

			 <div styleName={inputStyle} >
			 	 <input type="input" onChange={this.newCategoryChange} />
				 <button type="button" onClick={() => this.createCategory()}>
				  Create
				 </button>
				 <button type="button" onClick={this.toggleCategoryMenu}>
					Cancel
				 </button>
			 </div>

		</div>

	    <div>
 		    <table>
 			    <thead>
 			        <tr>
 				        <th>Name</th>
 				        <th></th>
 			        </tr>
 			    </thead>

 		        <tbody>
 			    {categories.map((category, i) =>
 				     <tr key={i}>
 				        <td>
 				        {category.name}
 				        </td>
 				        <td>
 						    <button onClick={() => this.onDelete(category.id)}>Delte</button>
 					    </td>
 			         </tr>
 		        )}
 			    </tbody>

 			</table>
		 </div>

 		</div>
 		);
  }

}

export default cssModules(Categories, Styles, { allowMultiple: true });
