import {
  SignedInOrRedirect,
  SignedOut,
  SignedIn,
  SignedOutOrRedirect,
  Provider,
  useSignOut,
} from "@gadgetinc/react";
import { Suspense, useEffect } from "react";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate,
  Link,
  NavLink,
} from "react-router-dom";
import "./App.css";
import { api } from "./api";
import Index from "./routes/index";
import SignedInPage from "./routes/signed-in";
import LandingPage from "./routes/landing-page"
import SignInPage from "./routes/sign-in";
import SignUpPage from "./routes/sign-up";
import ResetPasswordPage from "./routes/reset-password";
import VerifyEmailPage from "./routes/verify-email";
import ChangePassword from "./routes/change-password";
import ForgotPassword from "./routes/forgot-password";
import MapPage from "./routes/map-page";

const App = () => {
  useEffect(() => {
    document.title = `Home - ${process.env.GADGET_PUBLIC_APP_SLUG} - Gadget`;
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <SignedOutOrRedirect redirectTo="/signed-in">
              <Index />
            </SignedOutOrRedirect>
          )
        },
        {
          path: "signed-in",
          element: (
            <SignedInOrRedirect redirectTo="/sign-in">
              <LandingPage />
            </SignedInOrRedirect>
          )
        },
        {
          path: "map",
          element: (
            <SignedInOrRedirect redirectTo="/sign-in">
              <MapPage />
            </SignedInOrRedirect>
          )
        },
        {
          path: "change-password",
          element: (
            <SignedInOrRedirect redirectTo="/sign-in">
              <ChangePassword />
            </SignedInOrRedirect>
          )
        },
        {
          path: "forgot-password",
          element: (
            <SignedOutOrRedirect redirectTo="/signed-in">
              <ForgotPassword />
            </SignedOutOrRedirect>
          )
        },
        {
          path: "sign-in",
          element: (
            <SignedOutOrRedirect redirectTo="/signed-in">
              <SignInPage />
            </SignedOutOrRedirect>
          )
        },
        {
          path: "sign-up",
          element: (
            <SignedOutOrRedirect redirectTo="/signed-in">
              <SignUpPage />
            </SignedOutOrRedirect>
          )
        },
        {
          path: "reset-password",
          element: <ResetPasswordPage />
        },
        {
          path: "verify-email",
          element: <VerifyEmailPage />
        }
      ]
    }
  ]);

  return (
    <Suspense fallback={<></>}> 
      <RouterProvider router={router} />
    </Suspense>
  );
};

const Layout = () => {
  const navigate = useNavigate();

  return (
    <Provider
      api={api}
      navigate={navigate}
      auth={window.gadgetConfig.authentication}
    >
      <div className="app">
        <Header />
        <div className="main-container">
          <Outlet />
        </div>
      </div>
    </Provider>
  );
};

const Header = () => {
  const signOut = useSignOut();

  return (
    <div className="header">
      <a
        href="/"
        target="_self"
        rel="noreferrer"
        style={{ textDecoration: "none" }}
      >
        <div className="logo">Haven</div>
      </a>
      <div className="header-content">
        <SignedOut>
          {/* <Link to="/sign-in" style={{ color: "black" }}>
            Sign in
          </Link>
          <Link to="/sign-up" style={{ color: "black" }}>
            Sign up
          </Link> */}
        </SignedOut>
        <SignedIn>
          <NavLink to="/signed-in" style={({ isActive }) => ({ 
            color: "black", 
            fontWeight: isActive ? "bold" : "normal"
          })}>
            Home
          </NavLink>
          <NavLink to="/map" style={({ isActive }) => ({ 
            color: "black", 
            fontWeight: isActive ? "bold" : "normal"
          })}>
            Map
          </NavLink>
          <Link to="/change-password" style={{ color: "black" }}>
            Change password
          </Link>
          <a onClick={signOut} style={{ color: "black", cursor: "pointer" }}>
            Sign out
          </a>
        </SignedIn>
      </div>
    </div>
  );
};

export default App;
