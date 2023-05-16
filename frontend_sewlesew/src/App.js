// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';
import { Home,
         Navbar,
         Postdetail,
         Login,
         Signup,
         Resetpassword,
         Userdonations,
         Userpendingdonations,
         Userposts,
         PostUploadForm,
         Usereditprofile,
         VerifyPayment,
         PaymentSuccess,
         BottomNav
         } from './components';
import { DynamicContextProvider } from "./contexts/DynamicContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <DynamicContextProvider>
      {/* <ToastContainer 
        position="top-center"
        closeOnClick
      /> */}
      <BrowserRouter>
      <Navbar/>
      <Box sx={{ backgroundColor: '#FFFFFF', mt: "100px"}}>
          <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/posts/:id" element={<Postdetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/resetpassword" element={<Resetpassword />} />
              <Route path="/user" element={<Userdonations />} />
              <Route path="/userdonations" element={<Userdonations />} />
              <Route path="/userpendingdonations" element={<Userpendingdonations />} />
              <Route path="/userposts" element={<Userposts />} />
              <Route path="/postuploadform" element={<PostUploadForm />} />
              <Route path="/edituserprofile" element={<Usereditprofile />} />
              <Route path="/verify-payment" element={<VerifyPayment />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />

              {/* <Route path="/channel/:id" element={<ChannelDetail />} />
              <Route path="/search/:searchTerm" element={<SearchFeed />} /> */}
          </Routes> 
      </Box>
      <BottomNav />
      </BrowserRouter>
    </DynamicContextProvider>
  );
}

export default App;
