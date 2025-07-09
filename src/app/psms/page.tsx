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
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {psms.map((psm, idx) => (
            <div
              key={psm.id}
              style={{
                width: '100%',
                minWidth: 0,
                maxWidth: '100%',
                minHeight: 180,
                background: '#f8f9fa',
                borderRadius: 20,
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                padding: 12,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                border: '1px solid #f3f3f3',
                boxSizing: 'border-box',
              }}
            >
              <div style={{
                width: '100%',
                height: 70,
                borderRadius: 15,
                background: idx % 2 === 0
                  ? 'linear-gradient(to bottom left, #e0c3fc, #f5f2f9)'
                  : 'linear-gradient(to bottom, #c3cfe2, #e7c3e4)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                padding: 12,
                marginBottom: 8,
              }}>
                <span style={{ fontSize: 20, fontWeight: 600, color: '#000', fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}>{psm.nombre[0]}{psm.apellido[0]}</span>
              </div>
              <div style={{ width: '100%' }}>
                <h3 style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif', color: '#222', fontSize: 15, fontWeight: 600, margin: 0 }}>{psm.nombre} {psm.apellido}</h3>
                <p style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif', color: '#444', fontSize: 12, fontWeight: 400, margin: '2px 0 8px 0' }}>{psm.expertise || "No expertise"}</p>
                <div style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#635BFF', fontSize: 11, marginBottom: 2 }}>
                    <MapPin className="w-4 h-4 mr-2" />
                    <span style={{ color: '#333', fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}>{psm.lugarResidencia || "N/A"}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#635BFF', fontSize: 11, marginBottom: 2 }}>
                    <Clock className="w-4 h-4 mr-2" />
                    <span style={{ color: '#333', fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}>{psm.horarioEnvio ? new Date(psm.horarioEnvio).toLocaleString() : "N/A"}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#635BFF', fontSize: 11 }}>
                    <Mail className="w-4 h-4 mr-2" />
                    <span style={{ color: '#333', fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}>{psm.email}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleHire(psm)}
                  className="w-full rounded-full bg-[#635BFF] hover:bg-[#b266ff] text-white py-2 px-4 font-bold transition mt-2 cursor-pointer"
                  style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif', fontSize: 12 }}
                >
                  Hire PSM
                </button>
              </div>
            </div>
          ))}
        </div>
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
