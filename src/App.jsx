import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard"
import Account from "./pages/Account"
import Bookings from "./pages/Bookings"
import Cabins from "./pages/Cabins"
import Login from "./pages/Login"
import Setting from "./pages/Settings"
import PageNotFound from "./pages/PageNotFound"
import Users from "./pages/Users"
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import AuthorizedUser from "./ui/AuthorizedUser";


  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime : 60 * 1000,
        staleTime : 0,
        // refetchInterval: 0, // Auto-fetch setiap 5 detik
      }
    }
  });

  function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
          
      <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route element={
              <AuthorizedUser>
                <AppLayout />
              </AuthorizedUser>
              }>
              <Route path='dashboard' element={<Dashboard />}/>
              <Route path='account' element={<Account />}/>
              <Route path='bookings' element={<Bookings />}/>
              <Route path='cabins' element={<Cabins />}/>
              <Route path='setting' element={<Setting />}/>
              <Route path='users' element={<Users />}/>
              <Route path='bookings/:bookingId' element={<Booking />}/>
              <Route path='checkin/:bookingId' element={<Checkin />}/>
            </Route>

            <Route index element={<Navigate replace to="dashboard" />}/>
            <Route path='login' element={<Login />}/>
            <Route path='*' element={<PageNotFound/>}/>
          </Routes>
        </BrowserRouter>

        <Toaster position={"top-center"} gutter={12} containerStyle={{ margin : "8px" }} toastOptions={{ 
          success : { duration : 3000},
          error : { duration : 5000},
          style : {fontSize: '16px', maxWidth: '500px', padding: '16px 24px', backgroundColor: 'var(--color-grey-0)', textColor: 'var(--color-grey-700)'}
        }} />
      </QueryClientProvider>
    )
  }

  export default App
