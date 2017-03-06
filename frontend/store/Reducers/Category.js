import
{
  REQUEST_CATEGORY_DATA,
  RECEIVE_CATEGORY_DATA,
  RECEIVE_CATEGORY_FAILURE
} from '../../Category/Actions';


const initiaState = {
  category : {
    id: 0,
    name: '',
    image: ''
  },
  topics:{
    items: [],
    currentPage: 0,
    totalPages: 0
  },
  isFetching: true,
  error: false
}


export function category(state = initiaState, action) {
 switch (action.type) {
    case REQUEST_CATEGORY_DATA:
	    return { ...state, isFetching: true };
    case RECEIVE_CATEGORY_DATA:
	    return { ...state, category: action.data, isFetching: false, error: false};
    case RECEIVE_CATEGORY_FAILURE:
  	    return state;
    default:
      return state;
  }
}

export default category;
