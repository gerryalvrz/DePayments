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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-textPrimary">Browse PSMs</h1>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search PSMs..."
            className="pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-textPrimary placeholder-gray-400 focus:border-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {psms.map((psm) => (
          <div
            key={psm.id}
            className="bg-surface p-6 rounded-lg border border-border hover:border-primary transition-colors"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                {psm.nombre[0]}
                {psm.apellido[0]}
              </div>
              <div className="ml-3">
                <h3 className="font-semibold text-textPrimary">
                  {psm.nombre} {psm.apellido}
                </h3>
                <p className="text-gray-400 text-sm">{psm.expertise || "No expertise"}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                {psm.lugarResidencia || "N/A"}
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                {psm.horarioEnvio
                  ? new Date(psm.horarioEnvio).toLocaleString()
                  : "N/A"}
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Mail className="w-4 h-4 mr-2" />
                {psm.email}
              </div>
            </div>

            <button
              onClick={() => handleHire(psm)}
              className="w-full bg-primary hover:bg-opacity-80 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Hire PSM
            </button>
          </div>
        ))}
      </div>

      {showModal && selectedPSM && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface p-6 rounded-lg max-w-md w-full mx-4 border border-border">
            <h3 className="text-lg font-semibold text-textPrimary mb-4">
              Hire {selectedPSM.nombre}
            </h3>
            <p className="text-gray-400 mb-6">
              This will initiate a wallet deposit to hire this PSM.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-border text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-primary hover:bg-opacity-80 text-white rounded-lg transition-colors">
                Confirm Hire
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
