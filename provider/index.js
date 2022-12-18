const { useState,createContext,useContext,useEffect,useMemo } = require("react")

import Head from 'next/head'
//import "bulma/css/bulma.css"
//import Web3 from "web3"
//import nftmarketplace from '../blockchain/nftmarketplace'
import { ethers } from "ethers";
import cryptokids from "../artifacts/contracts/Parentbank.sol/cryptokids.json";
import NFTContract from "../artifacts/contracts/NFT.sol/NFT.json";

//https://github.com/enochndika/nextjs-authentication-with-react-context/blob/master/auth/context.js
const Web3Context = createContext(null)
// const setListeners = provider => {
//   provider.on("chainChanged", _ => window.location.reload())
// }
// const createWeb3State = ({web3, contract, address}) => {
//     return {
//       web3,
//       contract,
//       address
//     }
//   }
export default function Web3Provider({children}) {
    //const caddress="0xA34cfeD78FCF1FB4B4D1d62Cc93Ff9b1Ddf834Dd"
    const caddress="0xAA0Bc8Ae153D4b7ee3806413d6a5E9517F454Bf8"
    
  const [provider, setProvider] = useState(null)
  const [address, setAddress] = useState(null)
  const [contractread, setContractread] = useState(null)
  const [contractwrite, setContractwrite] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [admin, setadmin] = useState(null)
    
    // const [web3Api,setweb3api]=useState(
    //     createWeb3State( {
    //         web3:null,
    //         contract:null,
    //         address:null
    //     })
    // )
    
      
      useEffect(() => {
        if (window.ethereum) {
          window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
              connect()
              setAddress(accounts[0]);
            } else {
              // setWallet("");
              // setStatus("🦊 Connect to Metamask using the top right button.");
            }
          });
        }
      }, []);
   

   

    const disconnect=async()=>{
      if(provider)
      {
        
        setProvider(null)
          setAddress(null)
          //setContract(null)
          setLoaded(false)
      }
      

    }
    const connect=async()=>{
      if(typeof window!=="undefined" && typeof window.ethereum!=="undefined")
      {
        
        try
        {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()
        const signeraddress= await signer.getAddress();
        console.log(`signer :${signeraddress}`)
        const contractreads = new ethers.Contract(caddress, NFTContract.abi, provider);
        const contractwrites = new ethers.Contract(caddress, NFTContract.abi, signer);
        //const isAdmin = await contractwrites.isAdmin()
        const isAdmin = "client"
        if(isAdmin=="Admin")
        {
          setadmin(true);
          //console.log(admin)
        }
        else{
          setadmin(false);
          //console.log(admin)
        }
        //   await window.ethereum.request({method:"eth_requestAccounts"})
        //   const cweb3= new Web3(window.ethereum)
          
        //   const accounts=await cweb3.eth.getAccounts()
        //   const caddress=accounts[0]
        //   const ccontract=nftmarketplace(cweb3)
        //setadmin(isAdmin);
        //console.log(`admin ${isAdmin}`)
           setProvider(provider)
           setAddress(signeraddress)
        setContractread(contractreads)
        setContractwrite(contractwrites)
           setLoaded(true)
           //console.log(contract);
        //   window.localStorage.setItem('web3', cweb3);
        //   window.localStorage.setItem('contract', ccontract);
        //   window.localStorage.setItem('Loaded', true);
        //   window.localStorage.setItem('address', caddress);
          
        //setListeners(provider)
          // setWeb3Api(
          //     createWeb3State({
          //       cweb3,
          //       ccontract,
          //       caddress
          //     })
          //   )
         
        }
        catch(err)
        {
          console.log(err.message)
        }

      }
      else
            {
                console.log("please install metamask")
            }
        
    }


    //const { web3, contract, address } = web3Api

      return (
        <Web3Context.Provider value={{ connect,disconnect,provider,contractread,contractwrite,loaded,address,admin }}>
          {children}
        </Web3Context.Provider>
      )

    
}
export  function useWeb3() {
    return useContext(Web3Context)
  }
  

  
