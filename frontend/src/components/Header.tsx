import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          AMFStore
        </Link>
        <nav className="flex gap-4">
          <Link to="/" className="text-gray-600 hover:text-blue-500">Produtos</Link>
          <Link to="/login" className="text-gray-600 hover:text-blue-500">Login</Link>
        </nav>
      </div>
    </header>
  );
}