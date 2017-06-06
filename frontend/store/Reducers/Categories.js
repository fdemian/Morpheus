import
{
   CREATE_CATEGORY,
   CREATE_CATEGORY_SUCCESS,
   CREATE_CATEGORY_FAILURE,
   REQUEST_CATEGORIES,
   RECEIVE_CATEGORIES,
   RECEIVE_CATEGORIES_FAILURE,
   DELETE_CATEGORY,
   DELETE_CATEGORY_SUCCESS,
   DELETE_CATEGORY_FAILURE
} from '../../Categories/Actions';

const initialState = {
  items: [],
  currentPage: 0,
  totalPages: 0
}

export function categories(state = initialState, action) {
 switch (action.type) {

   /* CREATE */
   case CREATE_CATEGORY:
     return state;
   case CREATE_CATEGORY_SUCCESS:
     const _items = state.items.concat(action.data);
     return {...state, items: _items};
   case CREATE_CATEGORY_FAILURE:
     return state;

   /* GET */
   case REQUEST_CATEGORIES:
     return {...state, isFetching: true};
   case RECEIVE_CATEGORIES:
     return {...state, items: action.data.items};
   case RECEIVE_CATEGORIES_FAILURE:
     return {...state, error: true};
    default:
      return state;

   /* DELETE */
   case DELETE_CATEGORY:
	  return state
   case DELETE_CATEGORY_SUCCESS:
      const updatedCategories = state.items.filter(element => element.id != action.data.id);
	  return { ...state, items: updatedCategories, error: false }
   case DELETE_CATEGORY_FAILURE:
	 return { ...state, error: true }

  }
}

export default categories;
