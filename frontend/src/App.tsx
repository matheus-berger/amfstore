import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";

// Componente de Layout Principal
function RootLayout() {
  return (
    <div className="p-4">
      <nav className="flex gap-4 mb-4">
        <Link to="/" className="text-blue-500 hover:underline">Home</Link>
        <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
      </nav>
      <hr />
      <main className="mt-4">
        <Outlet />
      </main>
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
