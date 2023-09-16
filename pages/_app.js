import { useEffect } from 'react';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from '../store/configure-store';
import { AppWrapper } from '../components/useAppContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('jquery/dist/jquery.js');
    import('bootstrap/dist/js/bootstrap.js');
  }, []);

  return (
    <Provider store={store}>
      <AppWrapper>
        <Component {...pageProps} />

        <ToastContainer
          position={toast.POSITION.BOTTOM_CENTER}
          autoClose={3000}
        />
      </AppWrapper>
    </Provider>
  );
}

export default MyApp;
