import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-black">404! Back To Home</h1>
        <Link to="/" className="mt-5 text-xl font-semibold text-primary">
          Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
