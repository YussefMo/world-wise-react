import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

import { CitiesProvider } from "./context/CitiesContext"
import { FakeAuthContextProvider } from "./context/FakeAuthContext";
import { WidthContextProvider } from "./context/WidthDetectContext";
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form"
import RestrictedRout from "./pages/RestrictedRout";
import SpinnerFullPage from "./components/SpinnerFullPage"

const HomePage = lazy(() => import('./pages/HomePage'))
const Product = lazy(() => import('./pages/Product'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Login = lazy(() => import('./pages/Login'))
const AppLayout = lazy(() => import('./pages/AppLayout'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))


function App() {
  return (
    <FakeAuthContextProvider>
      <CitiesProvider>
        <WidthContextProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route path="/world-wise-react/" element={<HomePage />} />
                  <Route path="/world-wise-react/product" element={<Product />} />
                  <Route path="/world-wise-react/pricing" element={<Pricing />} />
                  <Route path="/world-wise-react/login" element={<Login />} />
                  <Route path="/world-wise-react/app" element={<RestrictedRout><AppLayout /></RestrictedRout>}>
                  <Route index element={<Navigate replace to="cities" />} />
                    <Route path="cities" element={<CityList />} />
                    <Route path="cities/:id" element={<City />} />
                    <Route path="countries" element={<CountryList />} />
                    <Route path="form" element={<Form />} />
                  </Route>
                <Route path="world-wise-react/*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </WidthContextProvider>
      </CitiesProvider>
    </FakeAuthContextProvider>
  )
}

polyfillCountryFlagEmojis()

export default App