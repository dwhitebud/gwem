'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Chat from './Chat';
import EmailCompose from './EmailCompose';
import MeetingScheduler from './MeetingScheduler';
import DocumentSharing from './DocumentSharing';

export default function AdvisorHub() {
  const pathname = usePathname();

  // Determine which component to show based on the current route
  const renderContent = () => {
    switch (pathname) {
      case '/advisor-hub/email':
        return <EmailCompose />;
      case '/advisor-hub/schedule':
        return <MeetingScheduler />;
      case '/advisor-hub/documents':
        return <DocumentSharing />;
      default:
        return <Chat />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
      <div className="max-w-[1280px] mx-auto">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-[#025584]">Advisor Hub</h1>
          <p className="mt-2 text-[#02558499]">
            Coordinate with your financial planners, lawyers, and other professionals
          </p>

          {/* Sub-navigation */}
          <div className="mt-6 border-b border-gray-200">
            <nav className="flex space-x-8">
              <Link
                href="/advisor-hub"
                className={`pb-4 px-1 font-medium text-sm ${
                  pathname === '/advisor-hub'
                    ? 'border-b-2 border-[#025584] text-[#025584]'
                    : 'text-gray-500 hover:text-[#025584]'
                }`}
              >
                Chat
              </Link>
              <Link
                href="/advisor-hub/email"
                className={`pb-4 px-1 font-medium text-sm ${
                  pathname === '/advisor-hub/email'
                    ? 'border-b-2 border-[#025584] text-[#025584]'
                    : 'text-gray-500 hover:text-[#025584]'
                }`}
              >
                Email
              </Link>
              <Link
                href="/advisor-hub/schedule"
                className={`pb-4 px-1 font-medium text-sm ${
                  pathname === '/advisor-hub/schedule'
                    ? 'border-b-2 border-[#025584] text-[#025584]'
                    : 'text-gray-500 hover:text-[#025584]'
                }`}
              >
                Schedule Meeting
              </Link>
              <Link
                href="/advisor-hub/documents"
                className={`pb-4 px-1 font-medium text-sm ${
                  pathname === '/advisor-hub/documents'
                    ? 'border-b-2 border-[#025584] text-[#025584]'
                    : 'text-gray-500 hover:text-[#025584]'
                }`}
              >
                Documents
              </Link>
            </nav>
          </div>

          {/* Content area */}
          <div className="mt-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
