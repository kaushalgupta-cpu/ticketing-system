
'use client';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-600" style={{fontFamily: "Pacifico, serif"}}>
              logo
            </h1>
            <p className="text-gray-600 text-sm mt-1">Support Center</p>
          </div>
        </div>
      </div>
    </header>
  );
}
