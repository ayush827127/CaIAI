import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './context/AuthProvider.jsx'
import './index.css'
import router from './router/Router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    {/* <QueryClientProvider client={queryClient}> */}
      <RouterProvider router={router} />
    {/* </QueryClientProvider> */}
  </AuthProvider>
)
