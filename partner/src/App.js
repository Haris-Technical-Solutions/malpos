import { ThemeProvider } from "./context/Themes";
import { LoaderProvider } from "./context/Preloader";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Documentation, ChangeLog, Error } from "./pages/supports";
import {
  Avatars,
  Alerts,
  Buttons,
  Charts,
  Tables,
  Fields,
  Headings,
  Colors,
} from "./pages/blocks";
import {
  Ecommerce,
  Analytics,
  CRM,
  ForgotPassword,
  Register,
  Login,
  UserList,
  UserProfile,
  MyAccount,
  ProductList,
  ProductView,
  ProductUpload,
  InvoiceList,
  InvoiceDetails,
  OrderList,
  Message,
  Notification,
  BlankPage,
  Settings,
} from "./pages/master";
import Preparation from "./pages/master/Preparation";
import Ingredients from "./pages/master/Ingredients";
import IngredientsDetails from "./components/Tabs/IngredientsDetails";
import Categories from "./pages/master/Categories";
import Station from "./pages/master/Station";
import AuthProvider from "./context/Auth";

import PreparationView from "./pages/master/PreparationView";

import Rearrangement from "./pages/master/Rearrangement";
import Constructure from "./pages/master/Constructure";
import ConstructureEdit from "./pages/master/ConstructureEdit";
import ConstructureProduct from "./pages/master/ConstructureProduct";
import ConstructureDish from "./pages/master/ConstrucureDish";
import ManageModifier from "./pages/master/ManageModifier";
import ManageModifierEdit from "./pages/master/ManageModifierEdit";
import ManageModifierDuplicate from "./pages/master/ManageModifierDuplicate";
import Receipt from "./pages/master/Receipt";
import ReceiptEdit from "./pages/master/ReceiptEdit";
import Clients from "./pages/master/Clients";
import ClientCreate from "./pages/master/ClientCreate";
import AdminDashboard from "./pages/master/AdminDashboard";
import AdminTransaction from "./pages/master/AdminTransaction";
import Brands from "./pages/master/Brands";
import CreateBrand from "./pages/master/CreateBrand";
import Users from "./pages/master/Users";
import UserCreate from "./pages/master/UserCreate";
import Branches from "./pages/master/Branches";
import CreateBranch from "./pages/master/CreateBranches";
import Roles from "./pages/master/Roles";

import RequireAuth from "./Guard/RequireAuth";
import RoleCreate from "./pages/master/RoleCreate";

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastContainer />
        <LoaderProvider>
          <BrowserRouter>
            <Routes>
              {/* master Pages */}
              {/* <Route path="/ecommerce" element={<AdminDashboard />} />
              <Route path="/analytics" element={<AdminDashboard />} />
              <Route path="/crm" element={<CRM />} /> */}
              <Route path="/login" element={<Login />} />
              {/* <Route path="/register" element={<Register />} /> */}
              {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
              <Route path="/user-list" element={<UserList />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/my-account" element={<MyAccount />} />
              {/* <Route path="/product-list" element={<ProductList />} /> */}
              {/* <Route path="/product-view" element={<ProductView />} /> */}
              {/* <Route path="/product-view/:id" element={<ProductView />} /> */}
              {/* <Route path="/preparation-view" element={<PreparationView />} />
              <Route path="/product-upload" element={<ProductUpload />} />
              <Route path="/invoice-list" element={<InvoiceList />} />
              <Route path="/invoice-details" element={<InvoiceDetails />} /> */}
              {/* <Route path="/order-list" element={<OrderList />} />
              <Route path="/message" element={<Message />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/blank-page" element={<BlankPage />} /> */}
              {/* Blocks Pages */}
              {/* sk-admin main pages */}
              {/* <Route path="/dashboard" element={<AdminDashboard />} /> */}
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <AdminDashboard />
                  </RequireAuth>
                }
              />
              <Route path="/roles" element={<RequireAuth><Roles/></RequireAuth>}/>
              <Route
                path="/users"
                element={
                  <RequireAuth>
                    <Users />
                  </RequireAuth>
                }
              />
              <Route
                path="/create-branch"
                element={
                  <RequireAuth>
                    <CreateBranch />
                  </RequireAuth>
                }
              />

              <Route
                path="/users-create"
                element={
                  <RequireAuth>
                    <UserCreate />
                  </RequireAuth>
                }
              />

              <Route
                path="/roles-create"
                element={
                  <RequireAuth>
                    <RoleCreate />
                  </RequireAuth>
                }
              />

    
              <Route
                path="/clients"
                element={
                  <RequireAuth>
                    <Clients />
                  </RequireAuth>
                }
              />
              <Route
                path="/client-create"
                element={
                  <RequireAuth>
                    <ClientCreate />
                  </RequireAuth>
                }
              />
              <Route
                path="/transaction"
                element={
                  <RequireAuth>
                    <AdminTransaction />
                  </RequireAuth>
                }
              />
              <Route
                path="/brands"
                element={
                  <RequireAuth>
                    <Brands />
                  </RequireAuth>
                }
              />
              <Route
                path="/create-brand"
                element={
                  <RequireAuth>
                    <CreateBrand />
                  </RequireAuth>
                }
              />
              <Route
                path="/branches"
                element={
                  <RequireAuth>
                    <Branches />
                  </RequireAuth>
                }
              />
              {/* 
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/colors" element={<Colors />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/tables" element={<Tables />} />
              <Route path="/fields" element={<Fields />} />
              <Route path="/alerts" element={<Alerts />} /> */}
              {/* Custom Pages */}
              {/* <Route path="/preparation" element={<Preparation />} />
              <Route path="/ingredient" element={<Ingredients />} /> */}

              {/* <Route
                path="/ingredient-details"
                element={<IngredientsDetails />}
              /> */}
              {/* 
              <Route path="/categories" element={<Categories />} />
              <Route path="/station" element={<Station />} /> */}
              {/* fix donr */}
              {/* <Route path="/rearrangement" element={<Rearrangement />} />
              <Route path="/constructure" element={<Constructure />} /> */}
              {/* constructure edit page */}
              {/* <Route path="/constructure-edit" element={<ConstructureEdit />} /> */}
              {/* constructure page edit option having first option product, page product here it is ..  */}

              {/* <Route
                path="/constructure-product"
                element={<ConstructureProduct />}
              /> */}
              {/* constructure page edit option having secound option dish, here it is the dish page .. */}
              {/* <Route path="/constructure-dish" element={<ConstructureDish />} /> */}

              {/* modifier page  */}
              {/* <Route path="/manage-modifier" element={<ManageModifier />} /> */}
              {/* page for edit when user click on edit  */}
              {/* <Route
                path="/manage-modifier-edit"
                element={<ManageModifierEdit />}
              /> */}
              {/* page for duplicta when user click on duplicta  */}
              {/* <Route
                path="/manage-modifier-duplicate"
                element={<ManageModifierDuplicate />}
              /> */}
              {/* receipt ffix bugs*/}
              {/* <Route path="/receipt" element={<Receipt />} />
              <Route path="/receipt-edit" element={<ReceiptEdit />} /> */}

              {/* Supports Pages */}
              <Route path="*" element={<Error />} />
              <Route path="/" element={<Login />} />
              {/* <Route path="/documentation" element={<Documentation />} />
              <Route path="/changelog" element={<ChangeLog />} /> */}
            </Routes>
          </BrowserRouter>
        </LoaderProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
