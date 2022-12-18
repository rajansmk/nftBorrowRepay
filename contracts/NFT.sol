// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract NFT is ERC721URIStorage {
    struct NftDetails{
        bool borrowed;
        uint256 borrowedAmount;
    }
    struct NftDesc{
        uint tokenid;
        string url;
        uint price;
        bool borrowed;
        uint256 borrowedAmount;
    }
    using Counters for Counters.Counter;
    address public tokenAddress=0xdcAA009E6b128bCB514D27dB1674674c73B44f67;
    Counters.Counter private _tokenIds;
    mapping(uint256 => NftDetails) public nftBorrowedDetails;
    mapping(uint256 => uint256) public nftvalue;
    //mapping(address => mapping(uint => NftDesc[])) private mynft;
    mapping(address => NftDesc[]) private mynft;
    //mapping(address => uint[]) private nftcount;
    constructor() ERC721("GameItem", "ITM") {}

    function mintNFT(
        string memory tokenURI,
        uint256 nftAmount
    ) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        nftvalue[newItemId] = nftAmount;
        mynft[msg.sender].push(NftDesc(newItemId,tokenURI,nftAmount,false,0));
       // nftcount[msg.sender].push(newItemId);
        
        return newItemId;
    }
    function borrowdetailsflag(uint tokenid) public view returns(bool)
    {
        return nftBorrowedDetails[tokenid].borrowed;
    }
    function borrowdetailsprice(uint tokenid) public view returns(uint)
    {
        return uint(nftBorrowedDetails[tokenid].borrowedAmount);
    }
    function getMyNftDetails() public view returns(NftDesc[] memory)
    {
       return mynft[msg.sender];
        // uint length = nftcount[msg.sender].length;
        // NftDesc[] memory recc = new NftDesc[](length);

        // for(uint i=0;i < length;i++)
        // {
        //     uint id= nftcount[msg.sender][i];
        //     NftDesc storage details = mynft[msg.sender][id];
        //     recc[i] = details;
            
        // }
        // return recc;
        

    }
    function setTokenAddress(address _tokenAddress) external{
        tokenAddress = _tokenAddress;
    }
    
    function mybal() public view returns(uint)
    {
        return IERC20(tokenAddress).balanceOf(msg.sender);
    }

    function BorrowNft(
        uint256 nftId,
        uint256 tokenAmount
    ) external  {
        require(_ownerOf(nftId)==msg.sender,"you do not own this nft");
        require(!nftBorrowedDetails[nftId].borrowed,"already borrowed");
        // //require(IERC20(tokenAddress).balanceOf(address(this)) > tokenAmount, "Pool does not have enough liquidity");
        // require(IERC20(tokenAddress).balanceOf(msg.sender) > tokenAmount, "Pool does not have enough liquidity");
        // require(nftvalue[nftId]>=tokenAmount,"amount not allowed");
        nftBorrowedDetails[nftId] = NftDetails(true,tokenAmount);
        // bool result = IERC20(tokenAddress).transfer(address(this), tokenAmount);
        // require(result, "transfer failed while borrowing");
    }

    function RepayNft(
        uint256 nftId,
        uint256 tokenAmount
    ) external virtual {
        require(_ownerOf(nftId)==msg.sender,"you do not own this nft");
        require(nftBorrowedDetails[nftId].borrowed,"not borrowed");

        if(nftBorrowedDetails[nftId].borrowedAmount>=tokenAmount){
           nftBorrowedDetails[nftId].borrowedAmount-=tokenAmount;
           nftBorrowedDetails[nftId].borrowed=false; 
        }else {
             nftBorrowedDetails[nftId].borrowedAmount=0;
             nftBorrowedDetails[nftId].borrowed=false; 

        }
        // bool result = IERC20(tokenAddress).transfer( msg.sender, tokenAmount);
        // require(result, "transfer failed while borrowing");
    }
}
