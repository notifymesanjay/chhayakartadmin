import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from '../src/store/configure-store';
import { AppWrapper } from './components/useAppContext';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
			<Provider store={store}>
				<AppWrapper>
					{/* <PersistGate loading={null} persistor={Persiststore}> */}
					{/* <Success /> */}
					<App />
					{/* </PersistGate> */}
				</AppWrapper>
			</Provider>
		</BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
