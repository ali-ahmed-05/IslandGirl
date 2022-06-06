$(document).ready(function () {
    WalletFunction = {
        checkConnection: async function () {
            let web;
            if (window.ethereum) {
                web3 = new Web3(window.ethereum);
            } else if (window.web3) {
                web3 = new Web3(window.web3.currentProvider);
            };

            return web
        },

        // Connect Wallet
        loadWeb3: async function () {
            if (window.ethereum) {

                window.web3 = new Web3(window.ethereum);
                window.ethereum.enable();
                let ethereum = window.ethereum;

                const data = [{
                    chainId: '0x38',
                }]

                const tx = await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: data
                }).catch()

                if (tx) {
                    // console.log(tx)
                }

            }
        },

        // Get Current Account Address
        getCurrentAccount: async function () {
            const accounts = await window.web3.eth.getAccounts();
            return accounts[0];
        },

        balanceOf: async (address) => {
            const islandGirlContractMethods = new web3.eth.Contract(NftAbi, NftAddress);
            const balance = await islandGirlContractMethods.methods.balanceOf(address).call()
            return balance
        }
    }


    window.WalletFunction = WalletFunction

});