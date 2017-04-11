import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const selectStyle = {'width': '63%'};

class CategoriesDropdown extends Component {

 state = { currentValue: -1 };

 constructor(props) {
   super(props)
   this.changeFn = this.props.onChange;
   this.onDropdownChange = this.onDropdownChange.bind(this);
 }

 onDropdownChange(event){
   const value = event.target.value;
   const category = {id: value, name: ""};
   this.changeFn(category);
   this.setState({currentValue: value})
 }

 render() {

  const {categories} = this.props;

  return(
  <SelectField disabled={false} value={this.state.currentValue} onChange={this.onDropdownChange} style={selectStyle} >
    <MenuItem value={-1} key={-1} primaryText="Uncategorized" />
    {categories.map((category, i) =>
      <MenuItem value={category.id} key={category.id} primaryText={category.name} />
    )}
  </SelectField>
  );

 }
}

export default CategoriesDropdown;
