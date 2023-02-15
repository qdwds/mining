import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    solidity: {
        compilers: [
            { version: "0.5.0" },
            { version: "0.5.16" },
            { version: "0.8.0" },
            { version: "0.8.9" },
        ]
    },
    networks:{
        hardhat:{
            from:"http://localhost:8545",
            mining: {
                auto: true,
                interval: 1000
              }
        }
    }
};

export default config;
