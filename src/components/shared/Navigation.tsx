'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BellIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
}

const mainNavItems: NavItem[] = [
  {
    label: 'Portfolio',
    href: '/portfolio',
    subItems: [
      { label: 'Overview', href: '/portfolio' },
      { label: 'Trust & Corporate', href: '/portfolio/trust-and-corporate' },
    ],
  },
  {
    label: 'Risk Analysis',
    href: '/risk-analysis',
    subItems: [
      { label: 'Overview', href: '/risk-analysis' },
      { label: 'Risk Breakdown', href: '/risk-analysis/breakdown' },
      { label: 'Historical Trends', href: '/risk-analysis/trends' },
    ],
  },
  {
    label: 'Reports',
    href: '/reports',
    subItems: [
      { label: 'Performance', href: '/reports/performance' },
      { label: 'Analytics', href: '/reports/analytics' },
      { label: 'Custom Reports', href: '/reports/custom' },
    ],
  },
  {
    label: 'Tax Planning',
    href: '/tax-planning',
  },
  {
    label: 'Advisor Hub',
    href: '/advisor-hub',
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-[1280px] mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-primary text-2xl font-bold">
            GWEM
          </Link>

          <div className="flex items-center space-x-6">
            {mainNavItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`
                    px-6 py-3 text-sm font-medium rounded-lg transition-colors
                    ${pathname === item.href || pathname.startsWith(item.href + '/')
                      ? 'text-primary bg-primary/20'
                      : 'text-primary hover:bg-primary/20'
                    }
                  `}
                >
                  {item.label}
                </Link>

                {item.subItems && (
                  <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg rounded-lg mt-1 py-1 z-50">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`
                          block px-4 py-2 text-sm
                          ${pathname === subItem.href
                            ? 'bg-primary/10 text-primary'
                            : 'text-primary/80 hover:bg-primary/5'
                          }
                        `}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button className="px-6 py-3 text-sm font-medium text-primary hover:bg-primary/20 rounded-lg transition-colors">
              <BellIcon className="h-5 w-5" />
            </button>

            <button className="px-6 py-3 text-sm font-medium text-primary hover:bg-primary/20 rounded-lg transition-colors">
              <Cog6ToothIcon className="h-5 w-5" />
            </button>

            <Link
              href="/advisor-hub"
              className="px-6 py-3 text-sm font-medium text-white bg-secondary hover:bg-secondary/90 rounded-lg transition-colors"
            >
              Contact Advisor
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
