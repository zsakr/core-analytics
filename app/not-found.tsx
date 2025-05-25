export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
        <p className="text-gray-400">The page you are looking for does not exist.</p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
