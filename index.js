// Connect Wallet function
async function connectWallet() {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            const balance = await web3.eth.getBalance(accounts[0]);
            const balanceInEth = web3.utils.fromWei(balance, 'ether');
            document.getElementById('balance').innerText = `Balance: ${balanceInEth} Matic`;
        } catch (error) {
            console.error(error);
        }
    } else {
        console.log('Ethereum wallet is not connected');
    }
}
function getTokenBalance() {
    const tokenContractAddress = 'TOKEN_CONTRACT_ADDRESS';
    const tokenContractABI = TOKEN_CONTRACT_ABI; // Replace with your token contract ABI

    // Create contract instance
    const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);

    if (!web3) {
        console.log('Web3 not initialized');
        return;
    }

    tokenContract.methods.balanceOf(web3.eth.defaultAccount).call()
        .then(balance => {
            const balanceFormatted = web3.utils.fromWei(balance, 'ether');
            document.getElementById('tokenBalance').innerText = `Token Balance: ${balanceFormatted} TOKEN`;
        })
        .catch(error => {
            console.error('Error fetching token balance:', error);
        });
}

// Get both balances on page load
function getBalances() {
    getMaticBalance();
    getTokenBalance();
}

document.getElementById('connectWallet').addEventListener('click', connectWallet);
