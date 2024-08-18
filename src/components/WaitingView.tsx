
const messages = {
  location: {
    title: "Waiting for Location Permission",
    description: "We need your location to proceed. Please grant location access in your browser settings."
  },
  fetching: {
    title: "Fetching Data",
    description: "We're retrieving the latest information. Please wait a moment."
  }
};

type TWaitingView = {
  type?: 'location' | 'fetching'
}

export default function WaitingView({ type = 'location' }: TWaitingView) {
  const { title, description } = messages[type];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <svg
          className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            className="opacity-25"
          />
          <path
            fill="currentColor"
            d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z"
            className="opacity-75"
          />
        </svg>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          {title}
        </h1>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
}
