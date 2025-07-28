module.exports = {
  async redirects() {
    return [
      {
        source: '/.well-known/farcaster.json',
        destination: 'https://api.farcaster.xyz/miniapps/hosted-manifest/01984e78-a485-eeda-c197-11adcca76a37',
        permanent: true,
      },
    ]
  },
}