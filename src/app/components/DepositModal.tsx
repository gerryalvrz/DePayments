import React, { useState, useEffect, useRef } from "react";

// Puedes reemplazar estos con tus propios selectores si ya existen
type SelectProps = {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
};
const Select: React.FC<SelectProps> = ({ value, onChange, options }) => (
  <select
    className="w-full border rounded-lg px-4 py-2 mb-4"
    value={value}
    onChange={e => onChange(e.target.value)}
  >
    <option value="">Selecciona destino</option>
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

// Simulación de función para obtener el wallet del PSM asignado (reemplaza con tu lógica real)
async function getAssignedPsychologistWallet(userId: string): Promise<string> {
  // Aquí deberías llamar a tu backend/Supabase
  return "0xPSMWalletExample";
}

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPsychologist: boolean;
  userId: string;
  userWallet?: string;
  psmWallet?: string;
  treasuryWallet?: string;
}

const DepositModal: React.FC<DepositModalProps> = ({
  isOpen,
  onClose,
  isPsychologist,
  userId,
  userWallet: userWalletProp,
  psmWallet: psmWalletProp,
  treasuryWallet: treasuryWalletProp,
}) => {
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [psmWallet, setPsmWallet] = useState(psmWalletProp || "");
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [transakUrl, setTransakUrl] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const treasuryWallet = treasuryWalletProp || process.env.NEXT_PUBLIC_TREASURY_ADDRESS || "";
  const userWallet = userWalletProp || "0xUserWalletExample"; // Reemplaza con lógica real

  // Obtener wallet del PSM asignado si es usuario
  useEffect(() => {
    if (!isPsychologist && userId && !psmWalletProp) {
      setLoading(true);
      getAssignedPsychologistWallet(userId)
        .then(addr => setPsmWallet(addr))
        .catch(() => setPsmWallet(""))
        .finally(() => setLoading(false));
    }
  }, [isPsychologist, userId, psmWalletProp]);

  // Cerrar modal al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Opciones de destino según rol
  const options = isPsychologist
    ? [
        { value: userWallet, label: "Mi cuenta personal" },
        { value: treasuryWallet, label: "Tesorería MotusDAO" },
      ]
    : [
        { value: userWallet, label: "Mi cuenta personal" },
        ...(psmWallet ? [{ value: psmWallet, label: "Mi psicólogo asignado" }] : []),
        { value: treasuryWallet, label: "Tesorería MotusDAO" },
      ];

  const handleContinue = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    // Redirigir a Transak en un iframe
    const apiKey = process.env.NEXT_PUBLIC_TRANSAK_API_KEY;
    const environment = apiKey === 'f6d14140-5912-4ea6-9579-b88593ac91c9' ? 'STAGING' : undefined;
    const params: Record<string, string> = {
      apiKey: apiKey || '',
      walletAddress: destination,
      cryptoCurrency: 'cUSD',
      network: 'CELO',
      fiatCurrency: 'MXN',
      defaultFiatAmount: String(amount || 300),
      disableCryptoSelector: 'true',
      disableNetworkSelector: 'true',
      hideMenu: 'true',
    };
    if (environment) {
      params.environment = environment;
    }
    const transakParams = new URLSearchParams(params);

    const url = `https://global.transak.com?${transakParams.toString()}`;
    setTransakUrl(url); // Mostrar el iframe
    setShowConfirm(false);
  };

  const handleCloseIframe = () => {
    setTransakUrl(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-lg">
        <button onClick={onClose} className="absolute top-4 right-4 text-xl">×</button>
        <h2 className="text-2xl font-bold mb-6 text-center">Depositar Fondos</h2>
        <label className="block mb-2 font-medium">Destino del depósito</label>
        <Select value={destination} onChange={setDestination} options={options} />
        {!isPsychologist && !psmWallet && !loading && (
          <div className="text-red-500 text-sm mb-2">No tienes un psicólogo asignado.</div>
        )}
        <label className="block mb-2 font-medium">Monto a depositar (MXN)</label>
        <input
          type="number"
          min="1"
          className="w-full border rounded-lg px-4 py-2 mb-4"
          placeholder="300"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button
          className="mt-2 w-full bg-[#635BFF] text-white rounded-full py-3 font-bold disabled:opacity-60 hover:bg-[#b266ff] cursor-pointer"
          disabled={!destination || !amount || Number(amount) <= 0 || loading}
          onClick={handleContinue}
        >
          Continuar
        </button>
        {/* Modal de confirmación */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full relative shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-center">Confirmar depósito</h3>
              <p className="mb-4 text-center">
                Vas a depositar <span className="font-bold">${amount} MXN</span> a <br />
                <span className="font-mono break-all">{destination}</span>
              </p>
              <div className="flex gap-4">
                <button
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancelar
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-[#635BFF] hover:bg-[#b266ff] text-white rounded-full font-bold transition-colors cursor-pointer"
                  onClick={handleConfirm}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Iframe modal para Transak */}
        {transakUrl && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="relative w-full max-w-2xl h-[80vh]">
              <button
                onClick={handleCloseIframe}
                className="absolute top-2 right-2 z-10 bg-white rounded-full px-3 py-1 shadow"
              >
                ×
              </button>
              <iframe
                src={transakUrl}
                title="Transak"
                className="w-full h-full rounded-2xl border-0"
                allow="camera; microphone; clipboard-read; clipboard-write"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositModal; 