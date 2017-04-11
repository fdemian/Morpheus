import
{
  REQUEST_CATEGORY_DATA,
  RECEIVE_CATEGORY_DATA,
  RECEIVE_CATEGORY_FAILURE,
  REQUEST_CATEGORY_TOPICS,
  RECEIVE_CATEGORY_TOPICS,
  RECEIVE_CATEGORY_TOPICS_FAILURE
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

  	/* TOPICS BY CATEGORY */
    case REQUEST_CATEGORY_TOPICS:
       return state;
    case RECEIVE_CATEGORY_TOPICS:
	   return { ...state, topics: action.data };
    case RECEIVE_CATEGORY_TOPICS_FAILURE:
       return { ...state, error: true };

    default:
      return state;
  }
}

export default category;
