// Reducer(s)
const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const toggler = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE":
      return !state;
    default:
      return state;
  }
};

// createStore()
import {createSore} from 'redux'
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => {
    return state;
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filder((l) => l !== listener);
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
}

// combineReducers()
import { combineReducers } from 'redux'
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};

// Provider
import { Provider } from 'react-redux'
class Provider extends Component {
	getChildContext() {
  	return {
    	store: this.props.store
    };
  }
  
  return () {
  	return this.props.children;
  }
}
Provider.childContextTypes = {
	store: React.PropTypes.object
};

{Component}.contextTypes = {
	store: React.PropTypes.object
}

// Init & Example
const store = createStore(combineReducers({ counter, toggler }));

store.subscribe(() => {
  document.getElementById("json").textContent = JSON.stringify(store.getState(), undefined, 2);
});

document.addEventListener("click", () => {
  store.dispatch({ type: "INCREMENT" });
});
