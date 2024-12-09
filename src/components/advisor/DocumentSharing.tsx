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
        <h2 className="text-2xl font-semibold text-[#025584]">Shared Documents</h2>
        <div className="flex-shrink-0">
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg bg-[#00D47E] hover:bg-[#00D47ECC] text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00D47E] cursor-pointer"
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

      <div className="bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
        <ul role="list" className="divide-y divide-[#E5E7EB]">
          {documents.map((doc) => (
            <li key={doc.id}>
              <div className="px-6 py-4 flex items-center">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <DocumentIcon className="h-8 w-8 text-[#02558499]" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-[#025584] truncate">{doc.name}</p>
                      <div className="mt-2 flex">
                        <p className="text-[#02558499]">
                          {doc.size} • {doc.type} •{' '}
                          {doc.uploadedAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium ${
                        doc.status === 'shared'
                          ? 'bg-[#00D47E33] text-[#00D47E]'
                          : doc.status === 'received'
                          ? 'bg-[#02558433] text-[#025584]'
                          : 'bg-[#94A3B833] text-[#94A3B8]'
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
