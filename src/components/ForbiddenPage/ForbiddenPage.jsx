import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import Loader from "../Loader/Loader";

const ForbiddenPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body text-center space-y-4">
          {/* Title */}
          <h1 className="text-3xl font-bold text-error">Access Denied</h1>

          {/* Subtitle */}
          <p className="text-base-content/70">
            You don't have access to view this page.
          </p>

          {/* Required Role */}
          <p className="text-sm text-base-content/60">
            Required role: <span className="badge badge-error">admin</span>
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline gap-2 flex-1"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            <button
              onClick={() => navigate("/")}
              className="btn btn-primary gap-2 flex-1"
            >
              <Home className="w-5 h-5" />
              Home
            </button>
          </div>

          {/* Note */}
          <div className="alert alert-warning mt-4 text-sm">
            Need admin access? Contact your system administrator.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
