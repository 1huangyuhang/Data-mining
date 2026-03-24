import React from 'react';

const HistoryPage: React.FC = () => (
  <div className="p-8 flex flex-col items-center justify-center h-[calc(100vh-10rem)] space-y-4">
    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center text-gray-400">
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
      History Reports Coming Soon
    </h2>
    <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
      We are building a comprehensive reporting system to help you visualize
      your long-term progress.
    </p>
  </div>
);

export default HistoryPage;
