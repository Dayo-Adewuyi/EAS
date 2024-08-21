# Lyrics Rating DApp POC

This decentralized application (DApp) allows users to rate lyrics using Ethereum attestations. The project leverages the Ethereum Attestation Service (EAS) SDK and Wagmi library for connecting to the blockchain. It also uses toast notifications for user feedback on success or error events.

## Features

- **Connect Wallet**: Users can connect their Ethereum wallet to interact with the DApp.
- **Rate Lyrics**: Users can like or dislike lyrics, which triggers an Ethereum attestation on the blockchain.
- **Toast Notifications**: Feedback is provided to the user via toast notifications for both successful and failed transactions.

## Technologies Used

- **React**: Frontend framework used for building the user interface.
- **Wagmi**: React Hooks library for Ethereum, used for wallet connection and management.
- **EAS SDK**: Ethereum Attestation Service SDK, used to create attestations on the Ethereum blockchain.
- **Ethers.js**: A library used to interact with the Ethereum blockchain.
- **React Toastify**: A library for providing beautiful toast notifications.

## Getting Started

### Prerequisites

- Node.js (>=14.x)
- npm or Yarn
- An Ethereum wallet (e.g., MetaMask)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/lyrics-rating-dapp.git
   cd lyrics-rating-dapp
    npm install
    ```