import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from './utils/router';
import { Provider } from 'react-redux';
import store from './store/store';
import AutoLogin from './components/AutoLogin';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AutoLogin>
        <RouterProvider router={router}/>
      </AutoLogin>
    </Provider>
  </StrictMode>,
)