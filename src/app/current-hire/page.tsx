import  { User, Mail, MapPin, Clock, X } from 'lucide-react';

export default function CurrentHire() {
  const currentPSM = {
    nombre: 'Ana',
    apellido: 'Rodriguez',
    email: 'ana@example.com',
    lugarResidencia: 'Mexico City',
    horarioEnvio: '9:00 AM - 6:00 PM',
    hiredDate: '2024-01-15'
  };

  return (
    <div className="space-y-8 px-4 py-8" style={{ background: 'linear-gradient(135deg, #f7f7f8 0%, #e0c3fc 100%)', minHeight: '100vh' }}>
      <h1 className="text-center" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif', color: '#222', fontSize: '1rem', fontWeight: 500, marginBottom: '2.5rem' }}>Current Hire</h1>
      <div className="max-w-2xl mx-auto">
        <div className="rounded-2xl shadow-lg p-8 bg-white transition-transform duration-300 ease-out transform hover:-translate-y-2 hover:scale-105 cursor-pointer">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-[#635BFF] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {currentPSM.nombre[0]}{currentPSM.apellido[0]}
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif', color: '#222' }}>
                  {currentPSM.nombre} {currentPSM.apellido}
                </h2>
                <p className="text-[#635BFF] font-medium" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif' }}>Currently Hired</p>
              </div>
            </div>
            <button className="p-2 text-[#FF5A5F] hover:bg-[#FF5A5F] hover:bg-opacity-10 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-700">
              <Mail className="w-5 h-5 mr-3 text-[#635BFF]" />
              <span>{currentPSM.email}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <MapPin className="w-5 h-5 mr-3 text-[#635BFF]" />
              <span>{currentPSM.lugarResidencia}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Clock className="w-5 h-5 mr-3 text-[#635BFF]" />
              <span>{currentPSM.horarioEnvio}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <User className="w-5 h-5 mr-3 text-[#635BFF]" />
              <span>Hired since {currentPSM.hiredDate}</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="flex-1 bg-[#FF5A5F] hover:bg-opacity-80 text-white py-3 px-4 rounded-full font-bold transition-colors" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}>
              End Hire
            </button>
            <button className="flex-1 border border-gray-200 text-gray-700 py-3 px-4 rounded-full hover:bg-gray-100 font-bold transition-colors" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}>
              Switch PSM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
 