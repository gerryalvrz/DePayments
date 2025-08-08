# DePayments - MotusDAO Payment Platform

A decentralized payment platform built for MotusDAO, featuring seamless wallet integration, Mental Health Profesoinals (PSM-Profesional de la Salud Mental in Spanish) management, service provider and client database, AI-powered chat assistance, and Transak on/off ramp integration for fiat-to-crypto conversions. The platform supports both traditional web3 wallet connections and Farcaster Mini App integration for enhanced user experience.

## 🚀 Features

- **Multi-Wallet Support**: Seamless integration with traditional web3 wallets and Farcaster Mini Apps
- **PSM Management**: Browse and manage Mental Health Professionals
- **Smart Account Integration**: Account abstraction for enhanced security
- **AI Chat Dashboard**: Intelligent assistant for platform guidance
- **Payment Processing**: Secure on-chain payment handling
- **Fiat On/Off Ramp**: Transak integration for seamless fiat-to-crypto conversions
- **User Management**: Comprehensive user profiles and settings
- **Responsive Design**: Modern UI optimized for all devices

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: Privy for wallet authentication
- **Smart Accounts**: ZeroDev for account abstraction
- **Blockchain**: Ethereum/Celo with Viem
- **Styling**: Tailwind CSS with custom design system
- **Database**: Prisma with PostgreSQL
- **AI Integration**: OpenAI/Anthropic (configurable)
- **Farcaster Integration**: Mini App SDK with Wagmi
- **On/Off Ramp**: Transak for fiat-crypto conversions

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DePayments
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   # Privy Configuration
   NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
   NEXT_PUBLIC_PRIVY_CLIENT_ID=your_privy_client_id

   # ZeroDev Configuration
   ZERODEV_PROJECT_ID=your_zerodev_project_id

   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/depayments"

   # AI Service Configuration (Optional)
   OPENAI_API_KEY=your_openai_api_key
   ANTHROPIC_API_KEY=your_anthropic_api_key

   # Farcaster Mini App (Optional)
   FARCASTER_DEVELOPER_MNEMONIC=your_developer_mnemonic

   # Transak Configuration (Optional)
   NEXT_PUBLIC_TRANSAK_API_KEY=your_transak_api_key
   NEXT_PUBLIC_TRANSAK_ENVIRONMENT=sandbox # or production
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Farcaster Mini App Integration

The platform supports Farcaster Mini App integration for seamless wallet interaction:

1. **Install Farcaster dependencies**
   ```bash
   npm install @farcaster/miniapp-wagmi-connector wagmi
   ```

2. **Configure Wagmi provider**
   The platform automatically detects if it's running as a Mini App and configures the appropriate wallet connector.

3. **Wallet Interaction**
   Users can interact with their Ethereum wallets without wallet selection dialogs when running as a Mini App.

### Transak On/Off Ramp Integration

The platform integrates Transak for seamless fiat-to-crypto conversions:

1. **Install Transak dependencies**
   ```bash
   npm install @transak/transak-sdk
   ```

2. **Configure Transak**
   - Get API keys from [Transak Dashboard](https://transak.com)
   - Set environment variables for API key and environment
   - Configure supported networks and currencies

3. **Features**
   - Buy crypto with fiat (credit/debit cards, bank transfers)
   - Sell crypto for fiat
   - Support for multiple payment methods
   - KYC/AML compliance built-in
   - Real-time exchange rates

### Smart Account Setup

1. **ZeroDev Configuration**
   - Create a project at [ZeroDev](https://zerodev.app)
   - Add your project ID to environment variables
   - Configure your preferred validation methods

2. **Account Abstraction Features**
   - Gasless transactions
   - Batch operations
   - Social recovery options

## 📁 Project Structure

```
DePayments/
├── src/
│   ├── app/
│   │   ├── api/                 # API routes
│   │   │   ├── psms/           # Mental Health Professional management
│   │   │   ├── users/          # User management
│   │   │   └── ai-chat/        # AI chat endpoints
│   │   ├── components/         # Reusable components
│   │   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   │   ├── Topbar.tsx      # Top navigation
│   │   │   └── DepositModal.tsx # Deposit functionality
│   │   ├── providers/          # Context providers
│   │   │   └── AccountAbstraction.tsx # Smart account provider
│   │   ├── psms/              # Mental Health Professional browsing page
│   │   ├── psms-register/     # Mental Health Professional registration
│   │   ├── wallet/            # Wallet management
│   │   ├── payments/          # Payment processing
│   │   ├── profile/           # User profile
│   │   ├── current-hire/      # Current hire management
│   │   └── ai-chat/           # AI chat dashboard
│   ├── lib/                   # Utility functions
│   │   └── prisma.ts          # Database client
│   └── generated/             # Generated files
├── prisma/                    # Database schema
│   └── schema.prisma
├── public/                    # Static assets
└── package.json
```

## 🎯 Key Features Explained

### Mental Health Profesional PSM (Profesional de la Salud Mental) System
- Browse available Mental Health Professionals
- Register new Mental Health Professional services
- Manage PSM relationships and appointments
- Process payments for mental health services

### Smart Account Integration
- Account abstraction for enhanced UX
- Gasless transaction support
- Batch operation capabilities
- Social recovery mechanisms

### AI Chat Dashboard
- Intelligent platform assistance
- Training data management
- Model configuration options
- Conversation history

### Multi-Wallet Support
- Traditional web3 wallet connections
- Farcaster Mini App integration
- Automatic wallet detection
- Seamless switching between modes

### Fiat On/Off Ramp (Transak)
- Buy crypto with fiat currencies
- Sell crypto for fiat currencies
- Multiple payment methods support
- KYC/AML compliance
- Real-time exchange rates
- Global coverage with local payment options

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on push to main branch

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security Considerations

- **Environment Variables**: Never commit sensitive keys to version control
- **Smart Account Security**: Use proper validation methods
- **Database Security**: Implement proper access controls
- **API Security**: Validate all inputs and implement rate limiting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the inline code comments and this README
- **Issues**: Report bugs and feature requests via GitHub Issues
- **Discussions**: Join community discussions for questions and ideas

## 🔄 Updates and Maintenance

- **Dependencies**: Regularly update packages for security patches
- **Database**: Run migrations as needed with `npx prisma migrate dev`
- **Environment**: Keep environment variables updated with latest services

---

**Built with ❤️ for the MotusDAO community**
