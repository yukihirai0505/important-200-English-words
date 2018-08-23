import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCheck, faCheckCircle} from '@fortawesome/free-solid-svg-icons'

library.add(faCheck, faCheckCircle)

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
