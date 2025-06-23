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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-textPrimary">Current Hire</h1>

      <div className="max-w-2xl">
        <div className="bg-surface p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                {currentPSM.nombre[0]}{currentPSM.apellido[0]}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-textPrimary">
                  {currentPSM.nombre} {currentPSM.apellido}
                </h2>
                <p className="text-secondary">Currently Hired</p>
              </div>
            </div>
            <button className="p-2 text-alert hover:bg-alert hover:bg-opacity-10 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-300">
              <Mail className="w-5 h-5 mr-3 text-gray-400" />
              <span>{currentPSM.email}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <MapPin className="w-5 h-5 mr-3 text-gray-400" />
              <span>{currentPSM.lugarResidencia}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Clock className="w-5 h-5 mr-3 text-gray-400" />
              <span>{currentPSM.horarioEnvio}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <User className="w-5 h-5 mr-3 text-gray-400" />
              <span>Hired since {currentPSM.hiredDate}</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="flex-1 bg-alert hover:bg-opacity-80 text-white py-2 px-4 rounded-lg transition-colors">
              End Hire
            </button>
            <button className="flex-1 border border-border text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
              Switch PSM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
 