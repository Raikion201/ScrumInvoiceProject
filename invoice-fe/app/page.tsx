import MainLayout from '../src/app/components/mainlayout'

export default function HomePage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Invoice Management System
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Invoice Management</h2>
            <p className="text-gray-600">
              Manage your invoices efficiently with our comprehensive system.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Blog</h2>
            <p className="text-gray-600">
              Read our latest articles about development, web design, and technology.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Resources</h2>
            <p className="text-gray-600">
              Access helpful resources and documentation for your projects.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
