import React from "react";
import Sidebar from "@/components/Sidebar";
import ContentArea from "@/components/ContentArea";

export default function Home(): React.JSX.Element {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Side: Profile Sidebar */}
        <div className="lg:col-span-3">
          <Sidebar />
        </div>

        {/* Right Side: Main Content */}
        <div className="lg:col-span-9 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6 sm:p-8 shadow-sm">
          <ContentArea />
        </div>
      </div>
    </div>
  );
}