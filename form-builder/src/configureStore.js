import { createStore } from 'redux';
import throttle from 'lodash/throttle';
import formBuilder from './reducers';
import { loadState, saveState } from './localStorage';

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(formBuilder, persistedState);

  store.subscribe(throttle(() => {
    saveState({
      forms: store.getState().forms,
      sections: store.getState().sections,
      fields: store.getState().fields,
    });
  }, 1000));

  return store;
};

export default configureStore;
