async function main () {
    // We receive the contract to deploy
    const [owner] = await ethers.getSigners()
    const cryptokids = await ethers.getContractFactory('NFT');
    console.log('Deploying Box...');
    const box = await cryptokids.deploy();
    //console.log("test");
    //console.log("test");
    //console.log("test");

    await box.deployed();
    console.log('Box deployed to:', box.address);
    console.log('owner address:', owner.address);

    //test token
    // Box deployed to: 0xdcAA009E6b128bCB514D27dB1674674c73B44f67
    // owner address: 0xe38fdA89Ed0E7B35A7717D81D648210af6d92153
    //nft
    // Box deployed to: 0xB22289d88edA1a04EfF6E5a6819bb09df9Ffd735
    // owner address: 0xe38fdA89Ed0E7B35A7717D81D648210af6d92153

    //polygon
    // Box deployed to: 0xAA0Bc8Ae153D4b7ee3806413d6a5E9517F454Bf8
    // owner address: 0x1b3530619443E98066Ac42A263772a64F8cF5F27

    //https://ipfs.infura.io/ipfs/QmQuygaHWa1nMpe65ZSU9WsE6sCwmRmQW8f45iFps2Pm6C

  }
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
