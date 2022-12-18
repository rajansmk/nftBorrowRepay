import { useWeb3 } from "../provider";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import axios from 'axios'
const { useContext, useState, useEffect } = require("react");
import cryptokids from "../artifacts/contracts/Parentbank.sol/cryptokids.json";
//const client = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
//https://github.com/dabit3/polygon-ethereum-nextjs-marketplace/blob/main/pages/dashboard.js
const projectId = "2J2tO3qo81igF4WWzJy1vOMseE2";
const projectSecret = "b4ef569d37db72c627b62852f92d5c4f";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

// client.pin.add("QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn").then((res) => {
//   console.log(res);
// });

const defaultdat = {
  price: "",
};

export default function Home() {
  const {
    connect,
    provider,
    contractread,
    contractwrite,
    loaded,
    address,
    admin,
  } = useWeb3();
  const [fileUrl, setFileUrl] = useState(null);
  const [filehash, setFilehash] = useState(null);
  const [form, setFormdata] = useState(defaultdat);
  const [nfts, setNfts] = useState([]);

  const [owner, setowner] = useState("");

  const flag = false;

  const [amount, setAmount] = useState("");
  const [balanceamt, setbalanceamt] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...form,
      [name]: value,
    });
  };
  async function onChange(e) {
    debugger;
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://mayankdemo.infura-ipfs.io/ipfs/${added.path}`;
      const upath=added.path;
      setFileUrl(url);
      setFilehash(upath)
      debugger;
      console.log(filehash);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function uploadToIPFS() {
    debugger;
    const { price } = form;
    if (!price) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      
      image:fileUrl
    });
    try {
     //const added= client.pin.add(filehash);
      const added = await client.add(data);
      const url = `https://mayankdemo.infura-ipfs.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      return filehash;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function loadNFTs() {
    debugger;
    const data = await contractwrite.getMyNftDetails();
    //const data =JSON.stringify(datas);
    console.log(JSON.stringify(data));
    //const dat="[{'type':'BigNumber','hex':'0x01'},'https://ipfs.infura.io/ipfs/QmXPc5tFjh4naowyGAFnZZh4hZ5AnTMJaRWauBY9SSz4kp',{'type':'BigNumber','hex':'0x08'},false,{'type':'BigNumber','hex':'0x00'}]";

    if (data === undefined) {
      let item = {
        tokenId: "",
        url: "",
        price: "",
      };
      return item;
    } else {
      let items = await Promise.all(
        data.map(async (i) => {
         const tokenid= i.tokenId;
         const prices=await contractwrite.borrowdetailsprice(i.tokenid.toString());
         const flag =await contractwrite.borrowdetailsflag(i.tokenid.toString());
         console.log(prices.toString());
         console.log(flag);
          //const tokenUri = await contractwrite.tokenURI(1)
          // const tokenUri = await contractwrite.borrowdetails(tokenid.toString())
          // console.log(tokenUri);
          //const meta = await axios.get(tokenUri)
          // let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
          let item = {
            tokenId: i.tokenid.toString(),
            url: `https://mayankdemo.infura-ipfs.io/ipfs/${i.url}`,
            price: prices.toString(),
            nftprice:i.price.toString(),
            flag:flag

          };
          return item;
        })
      );
      setNfts(items);
      console.log(items);
    }

    //setLoadingState('loaded')
  }

  useEffect(() => {
    // const getprofile = async () => {
    //   console.log(contractwrite);
    //   //debugger

    //   let profiles = await contractwrite.getProfile();

    //   setProfile({
    //     ffname : profiles.fname,
    //     llname : profiles.lname,
    //     aamount : ethers.utils.formatEther(profiles.amount),
    //     llperiod : profiles.timestamp,

    //   })
    //   //console.log(profiles.lperiod);

    // };
    debugger;
    if (address) {
      loadNFTs();
    }
  }, [contractwrite,address]);
  const resetForm = () => setFormdata(defaultdat);
  // const lnameChange = (event) => {
  //   setlname(event.target.value);
  // };
  // const lperiodChange = (event) => {
  //   setlperiod(event.target.value);
  // };
  // const caddressChange = (event) => {
  //   setcaddress(event.target.value);
  // };

  async function listNFT() {
    debugger;
    const url = await uploadToIPFS();

    const transaction = await contractwrite.mintNFT(url, form.price);
    await transaction.wait();
    loadNFTs();
  }
  
  const borrowNFT =async (event, param1,param2) => {
    console.log(event);
    console.log(param1);
    console.log(param2);
    const transaction = await contractwrite.BorrowNft(param1, param2);
    await transaction.wait();
    loadNFTs();
  };
  const repayNFT =async (event, param1,param2) => {
    console.log(event);
    console.log(param1);
    console.log(param2);
    const transaction = await contractwrite.RepayNft(param1, param2);
    await transaction.wait();
    loadNFTs();
  };


  return (
    <div>
      {loaded && (
        <div className="container contact">
          <div className="row">
            <div className="col-md-6">
              <div className="contact-form">
                <div className="form-group">
                  <label className="control-label col-sm-4">
                    Upload Image:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="file"
                      name="Asset"
                      className="my-4"
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label col-sm-2">Price:</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      value={form.price}
                      onChange={handleChange}
                      className="form-control"
                      id="price"
                      placeholder="price"
                      name="price"
                    />
                  </div>
                </div>

                {fileUrl && (
                  <img className="rounded mt-4" width="350" src={fileUrl} />
                )} 

                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    <button onClick={listNFT} className="btn btn-default">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              {/* <div className="card" >
                <img
                  className="card-img-top"
                  src="https://ipfs.infura.io/ipfs/QmXPc5tFjh4naowyGAFnZZh4hZ5AnTMJaRWauBY9SSz4kp"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title">8</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div> */}
              { 
            nfts.map((nft, i) => (
              
              <div key={i} className="card" >
                  <img className="card-img-top" src={nft.url} alt="Card image cap"/>
                  <div className="card-body">
                    <h5 className="card-title">NFT ID : {nft.tokenId}</h5>
                    <h5 className="card-title">NFT Price : {nft.nftprice}</h5>
                    <h5 className="card-title">Browwed Price : {nft.price}</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    
                    {!nft.flag && <a onClick={event => borrowNFT(event, nft.tokenId,4)}  className="btn btn-primary">Borrow </a>} 
                    {nft.flag && <a onClick={event => repayNFT(event, nft.tokenId,nft.price)}  className="btn btn-primary">Repay </a>} 
                  </div>
                </div>

              
              
            ))
          } 
            </div>

            {/* <div className="col-md-6">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Balance</th>
                    <th scope="col">Locking Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    
                    <td>{profile.ffname}</td>
                    <td>{profile.llname}</td>
                    <td>{profile.aamount}</td>
                    <td>{profile.lperiod}</td>
                  </tr>
                  
                </tbody>
              </table>
              <div className="contact-form">
                <div>{balanceamt}</div>
                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    <button onClick={getBalance} className="btn btn-default">
                      Check My Balance
                    </button>
                  </div>
                </div>
              </div>

              <div className="contact-form">
                <div>{owner}</div>
                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    <button onClick={getOwner} className="btn btn-default">
                      Owner
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="control-label col-sm-4" >
                  Widthraw:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    onChange={WidthrawamtChange}
                    className="form-control"
                    id="lp"
                    placeholder="Amount"
                    name="lp"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button onClick={Widthraw} className="btn btn-default">
                    Submit
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
