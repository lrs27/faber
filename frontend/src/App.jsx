import { useState, useEffect } from "react";

export default function App() {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setStatus(data.message))
      .catch((err) => setStatus("Backend not available"));
  }, []);
//just a temporary UI, to be updated
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Portfolio Builder
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Welcome!
          </h2>
          <p className="text-gray-600 mb-4">
            This is placeholder! 
          </p>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Backend:</strong> {status}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
