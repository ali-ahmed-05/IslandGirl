const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

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

                const providerOptions = {
                    walletconnect: {
                        package: WalletConnectProvider,
                        options: {
                            infuraId: 'https://bsc-dataseed1.binance.org',
                            rpc: {
                                56: " https://bsc-dataseed.binance.org/",
                            },
                        }
                    }
                };

                const web3Modal = new Web3Modal({providerOptions});
                const provider = await web3Modal.connect();


                if (provider.isMetaMask) {
                    /*Meta Mask Connect */
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
                }else {
                    /*Wallet Connect */
                    // window.web3 = new Web3(provider);
                    alert("Working")
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
        },

        getTokenByIndex: async (address) => {
            const islandGirlContractMethods = new web3.eth.Contract(NftAbi, NftAddress);
            const owner = await islandGirlContractMethods.methods.tokenByIndex(address).call()
            return owner;
        },

        getTokenURI: async (address) => {
            const islandGirlContractMethods = new web3.eth.Contract(NftAbi, NftAddress);
            const token = await islandGirlContractMethods.methods.tokenURI(address).call()
            return token;
        }
    }


    window.WalletFunction = WalletFunction

});
