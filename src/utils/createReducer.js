export const createReducer = (initialState, handlers) => {
  //initialState je inicijalno stanje reducera koje mi odredjujemo
  //handlers su svi case-ovi koje mi dispatchujemo u akcijama a nas reducer
  //ih pokriva
  console.log("handlers", handlers);
  return function reducer(state = initialState, action) {
    console.log("action", action);
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      console.log("ovo ce se tri puta okinuti");
      return state;
    }
  };
};
