import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import 'nprogress/nprogress.css'
import App from 'src/App'
import { SidebarProvider } from 'src/layouts/Sidebar/SidebarContext'
import * as serviceWorker from 'src/serviceWorker'
import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <HelmetProvider>
            <SidebarProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </SidebarProvider>
        </HelmetProvider>
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister()
