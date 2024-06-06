import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <h1>404 Page not found</h1>
      <Link to={`/`}>
                <button className=" mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded">
                  Go to Homepage
                </button>
              </Link>
    </div>
  );
}

export default ErrorPage;