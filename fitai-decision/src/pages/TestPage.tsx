import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900">Test Page</h1>
      <p className="mt-4 text-gray-600">This is a test page to check if the app is rendering correctly.</p>
      <div className="mt-8 bg-blue-100 p-4 rounded-lg">
        <p className="text-blue-800">If you can see this, the app is working!</p>
      </div>
    </div>
  );
};

export default TestPage;