import React from 'react';
import AddForm from './AddForm';
import Form from './form/Form';
import ExistingForms from './ExistingForms';
import '../stylesheets/index.scss';

const App = () => (
  <div className="container">
    <div className="row">
      <div className="col-xs-12">
        <ExistingForms />
      </div>
    </div>

    <div className="row">
      <div className="col-xs-12">
        <AddForm />
      </div>
    </div>
  </div>
);

export default App;
