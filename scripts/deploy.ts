import { parseUnits } from "ethers/lib/utils";
import { ethers, network } from "hardhat";

async function main() {
    const [acc1, acc2] = await ethers.getSigners();

    const UNI = await ethers.getContractFactory("UNI");
    const uni = await UNI.deploy();

    const USDT = await ethers.getContractFactory("USDT");
    const usdt = await USDT.deploy();

    const StakingRewards = await ethers.getContractFactory("StakingRewards");
    const staking = await StakingRewards.deploy(acc1.address,uni.address, usdt.address);

    // await network.provider.send("evm_setIntervalMining", [2000]);



    await usdt.transfer(acc2.address, parseUnits("10000"));
    await uni.transfer(staking.address, parseUnits("1000"));
    await staking.notifyRewardAmount("1111111111");

    const acc2Staking = await ethers.getContractAt("StakingRewards",staking.address,acc2);
    
    const acc2USDT = await ethers.getContractAt("USDT",usdt.address,acc2);
    await acc2USDT.approve(staking.address, ethers.constants.MaxUint256);
    
    await acc2Staking.stake(parseUnits("100"));


    setInterval(async ()=>{
        console.log("当前用户奖励：",await acc2Staking.earned(acc2.address));
        console.log("总质押额度：",await acc2Staking.totalSupply());
        console.log("我质押额度：",await acc2Staking.balanceOf(acc2.address));
        console.log("挖矿总量",await acc2Staking.getRewardForDuration());
        console.log("每秒token奖励",await acc2Staking.rewardPerToken());
        console.log(await staking.lastTimeRewardApplicable());
        
        console.log("-------------------------------------------")
    },1000)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
