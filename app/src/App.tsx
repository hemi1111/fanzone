import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Footer from "./components/Footer";
import { CartProvider } from "./contexts/ShopContext";
import ScrollToTop from "./ScrollToTop";
import HomePage from "./features/home-page/HomePage";
import F1 from "./pages/F1";
import Cars from "./pages/Cars";
import Movies from "./pages/Movies";
import Football from "./pages/Football";
import Basketball from "./pages/Basketball";

const OutletPage = lazy(() => import("./OutletPage"));
const ProductDetail = lazy(
  () => import("./features/product-details/ProductDetail")
);
const Cart = lazy(() => import("./features/cart/Cart"));
const CheckoutPage = lazy(() => import("./features/checkout/Checkout"));
const Contact = lazy(() => import("./features/contact/Contact"));

const App = () => {
  return (
    <CartProvider>
      <ScrollToTop />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<OutletPage />}>
                <Route index element={<HomePage />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="contact-us" element={<Contact />} />
                <Route path="f1" element={<F1 />} />
                <Route path="football" element={<Football />} />
                <Route path="futboll" element={<Football />} />
                <Route path="basketball" element={<Basketball />} />
                <Route path="basketboll" element={<Basketball />} />
                <Route path="cars" element={<Cars />} />
                <Route path="makina" element={<Cars />} />
                <Route path="movies" element={<Movies />} />
                <Route path="filma" element={<Movies />} />
              </Route>
            </Routes>
          </Suspense>
        </Box>
        <Footer />
      </Box>
    </CartProvider>
  );
};

export default App;
