'use client'

import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { EnvelopeIcon, ChatBubbleLeftRightIcon, CalendarIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import Chat from './Chat'
import EmailCompose from './EmailCompose'
import MeetingScheduler from './MeetingScheduler'
import DocumentSharing from './DocumentSharing'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function AdvisorHub() {
  const [selectedTab, setSelectedTab] = useState(0)

  const tabs = [
    { name: 'Chat', icon: ChatBubbleLeftRightIcon, component: Chat },
    { name: 'Email', icon: EnvelopeIcon, component: EmailCompose },
    { name: 'Schedule Meeting', icon: CalendarIcon, component: MeetingScheduler },
    { name: 'Documents', icon: DocumentTextIcon, component: DocumentSharing },
  ]

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-semibold text-gray-900">Advisor Hub</h1>
          <p className="mt-1 text-sm text-gray-500">
            Coordinate with your financial planners, lawyers, and other professionals
          </p>
        </div>

        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className="flex space-x-1 border-b border-gray-200 px-6">
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  classNames(
                    'flex items-center space-x-2 py-4 px-4 text-sm font-medium border-b-2 outline-none',
                    selected
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )
                }
              >
                <tab.icon className="h-5 w-5" aria-hidden="true" />
                <span>{tab.name}</span>
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="p-6">
            {tabs.map((tab, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  'rounded-xl focus:outline-none',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-teal-400'
                )}
              >
                <tab.component />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}
