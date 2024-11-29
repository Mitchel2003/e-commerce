import { BrowserRouter, Routes, Route } from "react-router-dom";

import { BusinessProvider } from "@/context/BusinessContext"
import { ProductProvider } from "@/context/ProductContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/auth/ProtectedRoute";
import RootLayout from "@/layouts/Root";

import Dashboard from "@/pages/Dashboard";
import Register from "@/pages/Register";
import Business from "@/pages/Business";
import Login from "@/pages/Login";
import Home from "@/pages/Home";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BusinessProvider>
          <ProductProvider>

            <BrowserRouter>
              <Routes>
                <Route element={<RootLayout />}>
                  {/* home index */}
                  <Route path="/" index element={<Home />} />

                  {/* auth routes */}
                  <Route path="/auth/login" element={<Login />} />
                  <Route path="/auth/register" element={<Register />} />

                  {/* business routes */}
                  <Route path="/business/:id" element={<Business />} />

                  {/* protected routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Route>

                </Route>
              </Routes>
            </BrowserRouter>

          </ProductProvider>
        </BusinessProvider>
      </AuthProvider>
    </ThemeProvider >
  )
}

export default App