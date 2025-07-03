"use client";
import { useEffect, useState } from "react";
import { Search, MapPin, Clock, Mail } from "lucide-react";

export default function BrowsePSMs() {
  const [psms, setPsms] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPSM, setSelectedPSM] = useState<any>(null);

  // Fetch PSMs from the API
  useEffect(() => {
    const fetchPSMs = async () => {
      try {
        const res = await fetch('/api/psms')
        setPsms(await res.json())
      } catch (error) {
        console.error("Failed to fetch PSMs:", error);
      }
    };

    fetchPSMs();
  }, []);

  const handleHire = (psm: any) => {
    setSelectedPSM(psm);
    setShowModal(true);
  };

  return (
    <div className="space-y-8 px-4 py-8" style={{ background: 'linear-gradient(135deg, #f7f7f8 0%, #e0c3fc 100%)', minHeight: '100vh' }}>
      <h1 className="text-center" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif', color: '#222', fontSize: '1rem', fontWeight: 500, marginBottom: '2.5rem' }}>Browse PSMs</h1>
      <div className="flex items-center justify-end mb-8">
        <div className="relative w-full max-w-xs">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search PSMs..."
            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-black placeholder-gray-400 focus:border-[#635BFF] w-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {psms.map((psm, idx) => (
          <div
            key={psm.id}
            className="rounded-2xl shadow-lg p-8 flex flex-col items-center transition-transform duration-300 ease-out transform hover:-translate-y-2 hover:scale-105 cursor-pointer"
            style={{
              background: idx % 2 === 0
                ? 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
                : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              border: 'none',
            }}
          >
            <div className="w-16 h-16 bg-[#635BFF] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
              {psm.nombre[0]}{psm.apellido[0]}
            </div>
            <h3 className="font-bold text-2xl mb-2" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif', color: '#222' }}>
              {psm.nombre} {psm.apellido}
            </h3>
            <p className="text-lg font-medium text-[#333] opacity-85 mb-4" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif' }}>{psm.expertise || "No expertise"}</p>
            <div className="space-y-2 mb-4 w-full">
              <div className="flex items-center text-gray-700 text-sm">
                <MapPin className="w-4 h-4 mr-2 text-[#635BFF]" />
                {psm.lugarResidencia || "N/A"}
              </div>
              <div className="flex items-center text-gray-700 text-sm">
                <Clock className="w-4 h-4 mr-2 text-[#635BFF]" />
                {psm.horarioEnvio
                  ? new Date(psm.horarioEnvio).toLocaleString()
                  : "N/A"}
              </div>
              <div className="flex items-center text-gray-700 text-sm">
                <Mail className="w-4 h-4 mr-2 text-[#635BFF]" />
                {psm.email}
              </div>
            </div>
            <button
              onClick={() => handleHire(psm)}
              className="w-full rounded-full bg-[#635BFF] hover:bg-[#7d4875] text-white py-3 px-4 font-bold transition mt-2"
              style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}
            >
              Hire PSM
            </button>
          </div>
        ))}
      </div>
      {showModal && selectedPSM && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full mx-4 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif', color: '#222' }}>
              Hire {selectedPSM.nombre}
            </h3>
            <p className="text-gray-700 mb-6">
              This will initiate a wallet deposit to hire this PSM.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-[#635BFF] hover:bg-[#7d4875] text-white rounded-full font-bold transition-colors">
                Confirm Hire
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
