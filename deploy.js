const ethers = require('ethers')
const fs = require('fs')
require('dotenv').config()

const main = async () => {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    const abi = fs.readFileSync("./compiled/SimpleStorage_sol_SimpleStorage.abi", "utf8")
    const binary = fs.readFileSync("./compiled/SimpleStorage_sol_SimpleStorage.bin", "binary")
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying, please wait ....")
    const contract = await contractFactory.deploy()
    await contract.deploymentTransaction().wait(1)
    const address = await contract.getAddress()
    console.log(address)

    const currentFavouriteNumber = await contract.retrieve()
    console.log("Current FN : " + currentFavouriteNumber.toString())
    const transactionResponse = await contract.store("7")
    const transactionReceipt = transactionResponse.wait(1)
    const updatedFavouriteNumber = await contract.retrieve()
    console.log("Updated FN : " + updatedFavouriteNumber.toString())
}
main().then(() => process.exit(0)).catch((err) => {
    console.error(err)
    process.exit(1)
})