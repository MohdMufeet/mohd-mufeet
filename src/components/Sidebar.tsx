import React from "react";

export default function Sidebar(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left sticky top-24">
      {/* Profile Image container */}
      <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-white dark:border-neutral-900 shadow-md mb-4 bg-gray-200">
        <img
          src="/profile.jpg" // Public folder me apni profile pic responsive layout ke liye set karein
          alt="Mohd Mufeet"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Identity */}
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
       Mohd Mufeet
      </h1>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
        Full Stack Developer
      </p>

      {/* Bio Tagline */}
      <div className="mt-4 flex items-start gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-xs">
        <span className="text-base leading-none">🌱</span>
        <p>Learning, building, and growing — one project at a time.</p>
      </div>
    </div>
  );
}