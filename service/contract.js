const Web3 = require("web3");
const moment = require("moment")

const islandGirlContract = require("./islandGirlContract.json")
const islandGirlB = require("./islandGirlB.json")

const walletAddress = process.env.WALLET_ADDRESS
const walletPrivateKey = process.env.WALLET_PRIVATE_KEY

const infraUrl = process.env.INFRA_URL

class IslandGirl {

    releaseFunds = async (address, amount) => {
        const web3 = new Web3(infraUrl);
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
            return true;

        } catch (e) {
            console.log("runPipelineAllCompanies:", e)
            return false;
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