const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const islandGirlB = require("./islandGirlB.json")
const islandGirlContract = require("./islandGirlContract.json")

const walletAddress = '0x6b83CE1fCdDe42b68c6c52d4aB896e287e15BD37'
const walletPrivateKey = "6ffe4ba5f35b779d9f1f918ee7a3b09966e487c3258a0a7ae659dd7205302704"

const infraUrl = process.env.INFRA_URL

class IslandGirl {

    releaseFunds = async (address, amount) => {
        const provider = new HDWalletProvider(walletPrivateKey, "https://bsc-dataseed.binance.org");
        const web3 = new Web3(provider);
        const networkId = await web3.eth.net.getId();
        const islandGirlContractMethods = new web3.eth.Contract(islandGirlContract.abi, islandGirlContract.address);

        try {
            const deployTx = await islandGirlContractMethods.methods.releaseFunds(address, amount);
            const deployTxGas = await deployTx.estimateGas({
                from: walletAddress
            })
            const deployTxGasPrice = await web3.eth.getGasPrice()
            const deployTxGasData = deployTx.encodeABI()
            const deployTxGasNonce = await web3.eth.getTransactionCount(walletAddress)
            web3.eth.accounts.wallet.add(walletPrivateKey)

            const deployTxData = {
                from: walletAddress,
                to: islandGirlContract.address,
                data: deployTxGasData,
                gas: deployTxGas,
                gasPrice: deployTxGasPrice,
                nonce: deployTxGasNonce,
                chainId: networkId
            }

            const deployTxReceipt = await web3.eth.sendTransaction(deployTxData)
            console.log(`LOG: >> file: contract.js >> line 72 >> runPipelineAllCompanies >> deployTxReceipt`, deployTxReceipt)
            console.log("transaction hash : ", deployTxReceipt.transactionHash)
            return 'Successfully Rewarded';

        } catch (e) {
            console.log("runPipelineAllCompanies:", e)
            return e.message;
        }
    }

    getMethods = async () => {
        const web3 = new Web3(infraUrl);
        const networkId = await web3.eth.net.getId();

        const islandGirlContractMethods = new web3.eth.Contract(islandGirlContract.abi, islandGirlContract.address);

        const method = await islandGirlContractMethods.methods;

        return method
    }

    balanceOf = async (address) => {
        try {
            const web3 = new Web3(infraUrl);
            const networkId = await web3.eth.net.getId();

            const islandGirlContractMethods = new web3.eth.Contract(islandGirlB.abi, islandGirlB.address);

            const balance = await islandGirlContractMethods.methods.balanceOf(address).call();

            return balance
        } catch (e) {
            console.log("runPipelineAllCompanies:", e)
            return false;
        }
    }
}

const IslandGirlMethods = new IslandGirl()

module.exports = {
    IslandGirlMethods
}