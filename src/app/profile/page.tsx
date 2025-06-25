'use client'
import { useState, useEffect } from 'react';
import { Save, User } from 'lucide-react';
import { usePrivy, useWallets } from '@privy-io/react-auth';

// Define the user data type
type UserData = {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  lugarResidencia: string;
  fechaNacimiento: string;
};

export default function Profile() {
  const { authenticated } = usePrivy();
  const { wallets } = useWallets();
  const walletAddress = wallets?.[0]?.address;
  
  const [formData, setFormData] = useState<UserData>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    lugarResidencia: '',
    fechaNacimiento: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data when wallet address changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (!walletAddress) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/users?wallet=${walletAddress}`);
        if (response.ok) {
          const userData = await response.json();
          if (userData) {
            // Convert date to format expected by input[type="date"]
            const formattedDate = userData.fechaNacimiento 
              ? new Date(userData.fechaNacimiento).toISOString().split('T')[0]
              : '';
            
            setFormData({
              nombre: userData.nombre || '',
              apellido: userData.apellido || '',
              email: userData.email || '',
              telefono: userData.telefono || '',
              lugarResidencia: userData.lugarResidencia || '',
              fechaNacimiento: formattedDate,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [walletAddress]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress) return;

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          wallet: walletAddress,
          owner: walletAddress,
          fechaNacimiento: new Date(formData.fechaNacimiento).toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile');
    }
  };

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Please connect your wallet to view and edit your profile</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <User className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold text-textPrimary">Profile Settings</h1>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit}>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full px-3 py-2 bg-dark border border-border rounded-lg text-textPrimary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full px-3 py-2 bg-dark border border-border rounded-lg text-textPrimary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-dark border border-border rounded-lg text-textPrimary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-2 bg-dark border border-border rounded-lg text-textPrimary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  name="lugarResidencia"
                  value={formData.lugarResidencia}
                  onChange={handleChange}
                  placeholder="Enter your location"
                  className="w-full px-3 py-2 bg-dark border border-border rounded-lg text-textPrimary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">Birth Date</label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-dark border border-border rounded-lg text-textPrimary focus:border-primary"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="mt-6 bg-primary hover:bg-opacity-80 text-white py-2 px-6 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}