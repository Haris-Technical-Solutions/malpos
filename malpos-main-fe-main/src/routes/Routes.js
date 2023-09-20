import { BrowserRouter, Routes, Route } from "react-router-dom";

import OrdersLine from "../pages/master/OrdersLine";
import ProductsView from "../pages/master/ProductsView";
import OrderReceipt from "../pages/master/OrderReceipt";
import ProductDetails from "../pages/master/ProductDetails";
import OrderNotification from "../pages/master/OrderNotification";
import KitchenOrderList from "../pages/master/KitchenOrderList";
import LoginPage from "../pages/LoginPage/LoginPage";
import { Error } from "../pages/supports";
import BrandNameForm from "../pages/BrandNameForm/BrandNameForm";
import PasswordPage from "../pages/PasswordPage/PasswordPage";
import PinPadPage from "../pages/PinPadPage/PinPadPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import ProductsUnderCategory from "../components/ProductsUnderCategory";
import Checkout from "../pages/Checkout/Checkout";
import SaleReports from "../pages/SaleReports/SaleReports";
// import BlankPage from "../pages/master/BlankPage";
import CRM from "../pages/master/CRM";
import RightSidebar from "../layouts/RightSideBar";
import PdfDocument from "../components/PdfDocument";
import ThermalInvoice from "../pages/ThermalInvoice/ThermalInvoice";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      {/* <RightSidebar /> */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="sign-up" element={<SignupPage />} />
        <Route path="brand-name" element={<BrandNameForm />} />
        <Route path="/password" element={<PasswordPage />} />
        <Route path="pin-pad" element={<PinPadPage />} />
        <Route path="*" element={<Error />} />
        <Route path="/orders-line" element={<OrdersLine />} />
        <Route path="/kitchen-order-list" element={<KitchenOrderList />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/order-receipt" element={<OrderReceipt />} />
        <Route path="/order-notification" element={<OrderNotification />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-products" element={<ProductsView />}>
          <Route path=":categoryId" element={<ProductsUnderCategory />} />
        </Route>
        {/* <Route path="/blank-page" element={<BlankPage />} /> */}
        <Route path="/sale-reports" element={<SaleReports />} />
        <Route path="/report" element={<PdfDocument />} />
        <Route path="/crm" element={<CRM />} />
        <Route path="/print-screen" element={<ThermalInvoice />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
