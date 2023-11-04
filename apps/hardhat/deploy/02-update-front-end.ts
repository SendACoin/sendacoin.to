import fs from "fs"
import { ethers, network } from "hardhat"

import { frontEndContractsFile, frontEndAbiFile, developmentChains } from "../helper-hardhat-config"

const func = async () => {
    if (!developmentChains.includes(network.name) && process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Front end written!")
    }
}

async function updateAbi() {
    const contract = await ethers.getContract("SacPayments")
    fs.writeFileSync(frontEndAbiFile, (contract.interface.format(ethers.utils.FormatTypes.json) as string))
}

async function updateContractAddresses() {
    const contract = await ethers.getContract("SacPayments")

    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    if (network.config.chainId!.toString() in contractAddresses) {
        if (!contractAddresses[network.config.chainId!.toString()].includes(contract.address)) {
            contractAddresses[network.config.chainId!.toString()].push(contract.address)
        }
    } else {
        contractAddresses[network.config.chainId!.toString()] = [contract.address]
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}



export default func;

func.id = "update_frontend";
func.tags = ["all", 'frontend'];
