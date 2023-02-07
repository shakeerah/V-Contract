const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("Deploying contracts with account: ", deployer.address);
    // 0x6503d05597b89472549505023187B54A65220988
    // 0x0DB825c76b31D97B9C5dBA4E494EA00f33e47DBc
  console.log("Account balance: ", accountBalance.toString());

  const VPortalFactory = await hre.ethers.getContractFactory('VPortal')
//   const VPortalContract = await VPortalFactory.deploy();
  const VPortalContract = await VPortalFactory.deploy({
    // fund contract with 0.1 ETH"
    value: hre.ethers.utils.parseEther('0.01'),
  });

  await VPortalContract.deployed()

  console.log('V-Portal contract address: => ', VPortalContract.address);
  // 0x1d3Aa3D6CFD0B80576B6ff4c7Cf70C89D35C54a7
  console.log('Deploying contract with Account address: =>', deployer.address);


}

const runMain  = async () => {
    try{
        await main();
        process.exit(0);
    }catch(err){
     console.log('🚀 ~ file: VPortal ~ deploy.js ~ runMain ~ err', err)
        process.exit(1);
    }
}

runMain()