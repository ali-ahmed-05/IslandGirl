// const Web3Modal = window.Web3Modal.default;
// const WalletConnectProvider = window.WalletConnectProvider.default;

$(document).ready(function () {
    const WalletFunction = {
        checkConnection: async function () {
            if (window.ethereum)
                return new Web3(window.ethereum);
            else if (window.web3)
                return new Web3(window.web3.currentProvider);
        },

        // Connect Wallet
        loadWeb3: async function () {
            if (window.ethereum) {
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

        tokenByIndex: async (address) => {
            const islandGirlContractMethods = new web3.eth.Contract(NftAbi, NftAddress);
            const owner = await islandGirlContractMethods.methods.tokenByIndex(address).call()
            return owner;
        },

        tokenURI: async (tokenId) => {
            const islandGirlContractMethods = new web3.eth.Contract(NftAbi, NftAddress);
            const token = await islandGirlContractMethods.methods.tokenURI(tokenId).call()
            return token;
        }
    };

    const MoralisFunctions = {
        // Initialize the Moralis
        initialize: function () {
            const serverUrl = 'https://c9j4w0rouvmh.usemoralis.com:2053/server';
            const appId = 'GUBGMHVpwcTsPFvNNVdG5DKtpv6UwksAfzw5aULcGzgG';
            Moralis.start({serverUrl, appId});
        },

        // Moralis Authentication
        authenticate: async function (address) {
            try {
                const user = await Moralis.authenticate({address});
                console.log({user});
            } catch (error) {
                console.log(error);
            }
        },
        logout: async function logOut() {
            await Moralis.User.logOut();
            console.log("logged out")
        },
        getNFTs: async function (address) {
            const config = {chain: '0x38', token_address: NftAddress, address};
            const userNFTs = await Moralis.Web3API.account.getNFTs(config);
            return userNFTs.result;
        },


    }

    const Constants = {
        SERVER_URL: "https://island-girl-game.herokuapp.com"
    }
    window.WalletFunction = WalletFunction;
    window.MoralisFunctions = MoralisFunctions;
    window.ConstantVars = Constants;

});
