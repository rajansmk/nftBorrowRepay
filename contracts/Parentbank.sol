// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract cryptokids{
    address public owner ;

    struct kids {
        string fname;
        string lname;
        uint amount;
        uint timestamp;
        address addr;
    }
    mapping(address => kids) public kidsdetails;
    //address[] kid;


    constructor(){
        owner=msg.sender;
    }
    modifier onlyowner(){
        require(msg.sender ==owner,"only owner can add kid");
        _;
    }

    function deposit(address addr,string memory _fname,string memory _name,uint _time) payable  public {
        
        require(msg.value >= 0.025 ether,"pay value amount");
        if(kidsdetails[addr].addr == addr)
        {
            kidsdetails[addr].amount +=msg.value ;
        }
        else{
            kidsdetails[addr]=kids(_fname,_name,msg.value,_time,addr);
        }
        
        //kid.push(addr);
    }
    function widthraw(uint _amount) public{

         require(kidsdetails[msg.sender].amount >=_amount,"not enough");
         //require(kidsdetails[msg.sender].canwithdraw == true,"wait for that time");
         uint time=kidsdetails[msg.sender].timestamp;
         if(block.timestamp > time)
         {
             kidsdetails[msg.sender].amount -=_amount;
             address  addr=kidsdetails[msg.sender].addr;
             payable(addr).transfer(_amount);

         }

    }

    function balance() public view returns(uint){
        return kidsdetails[msg.sender].amount ;
    }

    function getTotalAmount() public view returns(uint){
        return address(this).balance ;
    }

    function getProfile() public view returns(kids memory){
        return kidsdetails[msg.sender];
    }

    function isAdmin() public view returns(string memory){
        if(owner==msg.sender)
        {
            return "Admin";
        }
        else{
            return "client";
        }
    }
    
    function getOwner() public view returns(address){
        return owner;
    }

    


}

