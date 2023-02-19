// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
contract Art{
    address private owner;
    string private art;
    string private watermarkedArt;
    uint private price;
    address[] private licenser;
    constructor(string memory _art, string memory _watermarkedArt, uint _sellingPrice){
        art = _art;
        owner = msg.sender;
        price = _sellingPrice;
        watermarkedArt = _watermarkedArt;
    }
    modifier ownerCheck{
        require(owner == msg.sender);
        _;
    }
    modifier costs{
      require(
         msg.value >= price,
         "Not enough money."
      );
      _;
   }
    function setPrice(uint nprice) public ownerCheck{
        price = nprice;
    }
    function getPrice() public view returns(uint){
        return price;
    }
    function getOwner() public view returns(address){
        return owner;
    }
    function getArt() public view returns(string memory){
        if(hasLicenseAlready(msg.sender)){
            return art;
        }
        return watermarkedArt;
    }
    function hasLicenseAlready(address adr) public view returns(bool){
        for (uint i = 0; i < licenser.length; i++) {
            if (licenser[i] == adr) {
                return true;
            }
        }
        return false;
    }
    function purchaseLicense() public payable costs returns(string memory){
        if(hasLicenseAlready(msg.sender)){
            
            payable(msg.sender).transfer(msg.value);
            return art;
        }
        payable(owner).transfer(msg.value);
        licenser.push(msg.sender);
        return art;
    }
}