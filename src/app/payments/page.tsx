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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-textPrimary">Payment History</h1>
        <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">PSM</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Transaction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-dark hover:bg-opacity-30">
                  <td className="px-6 py-4 whitespace-nowrap text-textPrimary">{tx.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-textPrimary">{tx.psm}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-secondary font-medium">{tx.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-secondary/20 text-secondary">
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a 
                      href={`https://etherscan.io/tx/${tx.hash}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-info hover:text-info hover:underline flex items-center"
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