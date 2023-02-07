const main = async () => {
  const [deployer, randomPerson] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();
  // compile our contract and generate artifacts
  const VContractFactory = await hre.ethers.getContractFactory('VPortal');
  // create a local Ethereum network adn deploy contract
  const VContract = await VContractFactory.deploy({
    // fund contract with 0.1 ETH"
    value: hre.ethers.utils.parseEther('0.1'),
  });
  // wait until our contract is officially deployed to network
  await VContract.deployed();

  console.log('V-Portal contract address: => ', VContract.address);
  console.log('Deploying contract with Account address: =>', deployer.address);
  console.log('Random persons  address: ', randomPerson.address);

  let contractBalance = await hre.ethers.provider.getBalance(VContract.address)
  console.log("VContract Balance", hre.ethers.utils.formatEther(contractBalance))


  let waveHistory = await VContract.getVisitorsWaves();
  console.log('🚀 ~ file: run.js ~ line 18 ~ main ~ waveHistory', waveHistory);

  const firstWaveTrx = await VContract.wave(
    'I',
    'hello@shakirah.eth',
    'Waved myself first'
  );
  firstWaveTrx.wait();

  waveHistory = await VContract.getVisitorsWaves();
  console.log('🚀 ~ file: run.js ~ line 24 ~ main ~ waveHistory', waveHistory);

  // Use a randomPersons address to interact with the contract to invoke the wave function of the contract wave()
  const SecondWaveTrx = await VContract.connect(randomPerson).wave(
    'Rayan',
    '',
    'Another hello sender: ' + randomPerson.address
  );
  SecondWaveTrx.wait();

  const ThirdWaveTrx = await VContract.connect(randomPerson).wave(
    'Rayan',
    '',
    'Wave hello sender: ' + randomPerson.address
  );
  ThirdWaveTrx.wait();

  waveHistory = await VContract.getVisitorsWaves();
  console.log('🚀 ~ file: run.js ~ line 31 ~ main ~ waveHistory', waveHistory);

  let waveCount = await VContract.getTotalWaves();
  console.log('🚀 ~ file: run.js ~ line 31 ~ main ~ waveHistory', waveCount);

  contractBalance = await hre.ethers.provider.getBalance(VContract.address)
  console.log("VContract Balance", hre.ethers.utils.formatEther(contractBalance))
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log('Run Main Err: ', err);
    process.exit(1);
  }
};

runMain();
