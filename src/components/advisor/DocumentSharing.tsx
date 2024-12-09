import { useState } from 'react'
import { DocumentIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'

interface Document {
  id: number
  name: string
  size: string
  type: string
  uploadedAt: Date
  status: 'shared' | 'pending' | 'received'
}

export default function DocumentSharing() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: 'Financial_Report_2023.pdf',
      size: '2.4 MB',
      type: 'PDF',
      uploadedAt: new Date(),
      status: 'shared',
    },
    {
      id: 2,
      name: 'Tax_Documents.pdf',
      size: '1.8 MB',
      type: 'PDF',
      uploadedAt: new Date(),
      status: 'received',
    },
  ])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // Here you would typically upload the file to your server
    // For now, we'll just add it to our local state
    const newDocuments: Document[] = Array.from(files).map((file, index) => ({
      id: documents.length + index + 1,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type: file.type.split('/')[1].toUpperCase(),
      uploadedAt: new Date(),
      status: 'pending',
    }))

    setDocuments([...documents, ...newDocuments])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Shared Documents</h2>
        <div className="flex-shrink-0">
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 cursor-pointer"
          >
            <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
            Upload Document
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            multiple
            onChange={handleFileUpload}
          />
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {documents.map((doc) => (
            <li key={doc.id}>
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <DocumentIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-teal-600 truncate">{doc.name}</p>
                      <div className="mt-2 flex">
                        <p className="text-sm text-gray-500">
                          {doc.size} • {doc.type} •{' '}
                          {doc.uploadedAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        doc.status === 'shared'
                          ? 'bg-green-100 text-green-800'
                          : doc.status === 'received'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
