import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Landing from './Pages/Landing/Landing';
import Error from './Pages/Error/Error';
import './index.scss'
import DashBoardUser from './Pages/DashboardUser/DashBoardUser';
import DashBoardAdmin from './Pages/DashBoardAdmin/DashBoardAdmin'
import PurchaseForm from './Pages/PurchaseForm/PurchaseForm';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <Error />,
  },
  {
    path: "/DashBoardUser",
    element: <DashBoardUser />,
    errorElement: <Error />,
  },
  {
    path: "/DashBoardAdmin",
    element: <DashBoardAdmin />,
    errorElement: <Error />,
  },
  {
    path: "/PurchaseForm",
    element: <PurchaseForm />,
    errorElement: <Error />,
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
