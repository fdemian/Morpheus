import
{
   CREATE_CATEGORY,
   CREATE_CATEGORY_SUCCESS,
   CREATE_CATEGORY_FAILURE,
   REQUEST_CATEGORIES,
   RECEIVE_CATEGORIES,
   RECEIVE_CATEGORIES_FAILURE
} from '../../Categories/Actions';

const initialState = {
  items: [],
  currentPage: 0,
  totalPages: 0
}

export function categories(state = initialState, action) {
 switch (action.type) {

   case CREATE_CATEGORY:
     return state;
   case CREATE_CATEGORY_SUCCESS:
     const _items = state.items.push(action.data);
     return {...state, items: _items};
   case CREATE_CATEGORY_FAILURE:
     return state;

   case REQUEST_CATEGORIES:
     return {...state, isFetching: true};
   case RECEIVE_CATEGORIES:
     return {...state, items: action.data};
   case RECEIVE_CATEGORIES_FAILURE:
     return {...state, error: true};
    default:
      return state;
  }
}

export default categories;
