import React from 'react';
import cssModules from 'react-css-modules';
import Styles from './Styles.scss';
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import TextField from 'material-ui/TextField';
import ConfirmIcon from 'material-ui/svg-icons/action/done';
import CancelIcon from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

const DeleteButton = (props) => {

    if(props.loggedIn)
       return(
       <span onClick={() => props.deleteFn(props.id)} >
          <IconButton tooltip="Delete">
            <DeleteIcon color='#3b5998' />
          </IconButton>
       </span>
       );
    else
      return null;
}

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

    const loggedIn = this.props.isLoggedIn;
    console.log(loggedIn);
    console.log("___________");

	const {categories, isFetching, error} = this.props;
	const buttonStyle = this.state.categoryMenuVisible ? "Visible" : "Invisible";
	const inputStyle = this.state.categoryMenuVisible ? "Invisible" : "Visible";
    const CreateCategoryButton = this.isLoggedIn? (
    		        <FlatButton
                   hoverColor="gainsboro"
		           label="New category"
		           labelStyle={{'color': '#3b5998'}}
		           icon={<AddIcon  color='#3b5998' />}
		           onClick={this.toggleCategoryMenu}/>)  : null;

	return (
 	<div>

		<div>

            <div>
                {CreateCategoryButton}
            </div>

			 <div styleName={inputStyle} >
			 	 <TextField onChange={this.newCategoryChange} />

                 <FlatButton
                    icon={<ConfirmIcon color="gainsboro" />}
  	                onClick={() => this.createCategory()}
                    hoverColor="white"
		            style={{'minWidth': '30px'}}
                 />
	            <FlatButton
                    icon={<CancelIcon color="gainsboro" />}
  	                onClick={this.toggleCategoryMenu}
                    hoverColor="white"
		            style={{'minWidth': '30px'}}
                />
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
                            <DeleteButton id={category.id} loggedIn={loggedIn} deleteFn={this.onDelete} />
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
