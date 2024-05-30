import Home from "./components/Home";
import Navbar from "./components/layouts/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProductDetails from "./components/products/ProductDetails";
import { HelmetProvider } from "react-helmet-async";
import ProductSearch from "./components/products/ProductSearch";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import store from "./store";
import { loggedUser } from "./actions/authAction";
import MyProfile from "./components/user/MyProfile";
import { ProtectedRoute } from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import ChangePassword from "./components/user/ChangePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import Cart from "./components/products/Cart";
import ShippingDetails from "./components/products/ShippingDetails";
import OrderConfirm from "./components/products/OrderConfirm";
import ProductPayment from "./components/products/ProductPayment";
import { useEffect, useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/orders/OrderSuccess";
import MyOrders from "./components/orders/MyOrders";
import OrderDetails from "./components/orders/OrderDetails";
import AdminDashboard from "./components/admin/AdminDashboard";
import ListProducts from "./components/admin/ListProducts";
import AddNewProduct from "./components/admin/AddNewProduct";
import { Toaster } from "react-hot-toast";
import ProductUpdate from "./components/admin/ProductUpdate";
import ListOrder from "./components/admin/ListOrder";
import OrderUpdate from "./components/admin/OrderUpdate";
import ListUser from "./components/admin/ListUser";
import UserUpdate from "./components/admin/UserUpdate";

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  useEffect(() => {
    store.dispatch(loggedUser);
    const getStripeApiKey = async () => {
      try {
        const { data } = await axios.get("/api/v1/stripeapi");
        console.log(data.stripeApiKey);
        setStripeApiKey(data.stripeApiKey);
      } catch (error) {
        console.error("Error fetching Stripe API key:", error);
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // Request was made but no response received
          console.error("Request data:", error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Error message:", error.message);
        }
      }
    };
    getStripeApiKey();
  }, []);
  return (
    <div>
      <Router>
        <div className="h-screen w-screen box-border overflow-x-hidden scrollbar-hidden">
          <HelmetProvider>
            <Navbar />
            <Toaster />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search/:keyword" element={<ProductSearch />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/myprofile" element={<MyProfile />} />
              <Route
                path="/updateprofile"
                element={
                  <ProtectedRoute>
                    <UpdateProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/change/password"
                element={
                  <ProtectedRoute>
                    <ChangePassword />
                  </ProtectedRoute>
                }
              />
              <Route path="/forgot/password" element={<ForgotPassword />} />
              <Route
                path="/password/reset/:token"
                element={<ResetPassword />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shipping/info" element={<ShippingDetails />} />
              <Route path="/confirm/order" element={<OrderConfirm />} />

              {stripeApiKey && (
                <Route
                  path="/product/payment"
                  element={
                    <Elements stripe={loadStripe(stripeApiKey)}>
                      <ProductPayment />
                    </Elements>
                  }
                />
              )}
              <Route path="/shipping" element={<OrderSuccess />} />
              <Route path="/myorders" element={<MyOrders />} />
              <Route path="/order/details/:id" element={<OrderDetails />} />
            </Routes>

            {/* Admin Routes */}
            <div className="pl-[15rem]">
              <Routes>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<ListProducts />} />
                <Route path="/admin/products/add" element={<AddNewProduct />} />
                <Route
                  path="/admin/products/update/:id"
                  element={<ProductUpdate />}
                />
                <Route path="/admin/orders" element={<ListOrder />} />
                <Route path="/admin/order/:id" element={<OrderUpdate />} />
                <Route path="/admin/users" element={<ListUser />} />
                <Route path="/admin/user/:id" element={<UserUpdate />} />
              </Routes>
            </div>
          </HelmetProvider>
        </div>
      </Router>
    </div>
  );
};
export default App;