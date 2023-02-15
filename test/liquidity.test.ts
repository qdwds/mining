import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { parseUnits } from "ethers/lib/utils";
import { ethers } from "hardhat"

describe("StakingRewards",()=>{
    const deployFixture = async () => {
        const [acc1, acc2] = await ethers.getSigners();

        
        const UNI = await ethers.getContractFactory("UNI");
        const uni = await UNI.deploy();

        const USDT = await ethers.getContractFactory("USDT");
        const usdt = await USDT.deploy();

        const StakingRewards = await ethers.getContractFactory("StakingRewards");
        const staking = await StakingRewards.deploy(acc1.address,uni.address, usdt.address);


        return{
            uni,
            usdt,
            acc1,
            acc2,
            staking
        }
    }

    it("transfer",async()=>{
        const { usdt, acc2} = await loadFixture(deployFixture);
        const res = await usdt.transfer(acc2.address, parseUnits("1000"));
       console.log(res);
       
    })

    it("balanceOf",async()=>{
        const { usdt, acc2} = await loadFixture(deployFixture);
        const res = await usdt.balanceOf(acc2.address);
        debugger
        expect(res).to.eq("0");
    })
})