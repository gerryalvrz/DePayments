import  { ExternalLink, Filter } from 'lucide-react';

const transactions = [
  {
    id: '1',
    date: '2024-01-20',
    psm: 'Ana Rodriguez',
    amount: '0.1 ETH',
    status: 'Completed',
    hash: '0x742d35cc6bf00532a4b73c6f6d7a8b9e7a8b9e7a8b9e'
  },
  {
    id: '2',
    date: '2024-01-18',
    psm: 'Carlos Silva',
    amount: '0.05 ETH',
    status: 'Completed',
    hash: '0x8b9e7a8b9e7a8b9e742d35cc6bf00532a4b73c6f6d7a'
  }
];

export default function Payments() {
  return (
    <div className="space-y-8 px-4 py-8" style={{ background: 'linear-gradient(135deg, #f7f7f8 0%, #e0c3fc 100%)', minHeight: '100vh' }}>
      <h1 className="text-center" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif', color: '#222', fontSize: '1rem', fontWeight: 500, marginBottom: '2.5rem' }}>Payment History</h1>
      <div className="flex items-center justify-end mb-8">
        <button className="flex items-center space-x-2 rounded-full border border-gray-200 px-6 py-2 text-[#635BFF] font-bold bg-white hover:bg-[#F7F7F8] transition" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}>
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>
      <div className="rounded-2xl shadow-lg p-0 bg-white overflow-hidden transition-transform duration-300 ease-out transform hover:-translate-y-2 hover:scale-105 cursor-pointer">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ background: 'linear-gradient(90deg, #e0c3fc 0%, #8ec5fc 100%)' }}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-[#635BFF] uppercase tracking-wider" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}>Date</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-[#635BFF] uppercase tracking-wider" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}>PSM</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-[#635BFF] uppercase tracking-wider" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}>Amount</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-[#635BFF] uppercase tracking-wider" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}>Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-[#635BFF] uppercase tracking-wider" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}>Transaction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#f7f7f8]">
                  <td className="px-6 py-4 whitespace-nowrap text-[#222]" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif' }}>{tx.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#222]" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif' }}>{tx.psm}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#635BFF] font-bold" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}>{tx.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-[#e0c3fc] text-[#635BFF]" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a 
                      href={`https://etherscan.io/tx/${tx.hash}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#635BFF] hover:underline flex items-center"
                      style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif' }}
                    >
                      {tx.hash.slice(0, 12)}...
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}