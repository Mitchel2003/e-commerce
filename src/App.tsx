import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProductProvider } from "@/context/ProductContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/auth/ProtectedRoute";
import RootLayout from "@/layouts/Root";

import Dashboard from "@/pages/Dashboard";
import Products from "@/pages/Products";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Home from "@/pages/Home";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProductProvider>

          <BrowserRouter>
            <Routes>
              <Route element={<RootLayout />}>
                {/* home index */}
                <Route path="/" index element={<Home />} />

                {/* auth routes */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />

                {/* mean while */}
                <Route path="/dashboard" element={<Dashboard />} />

                <Route element={<ProtectedRoute />}>
                  {/* forms routes */}
                  {/* <Route path="/business" element={<Business />} /> */}
                  <Route path="/products" element={<Products />} />

                </Route>
              </Route>
            </Routes>
          </BrowserRouter>

        </ProductProvider>
      </AuthProvider>
    </ThemeProvider >
  )
}

export default App