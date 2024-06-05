// reducers.js

const initialState = {
    activePage: '',
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ACTIVE_PAGE':
        return {
          ...state,
          activePage: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  