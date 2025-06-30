import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

// Componente de Layout Principal
function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto p-4"> 
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Roteador
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
