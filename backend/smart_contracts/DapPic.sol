// SPDX-License-Identifier: MIT
pragma solidity^0.8.0;
import "./Art.sol";
contract PicDapp{
    mapping(address => Art[]) private arts; //owner's mapping with their created content
    constructor() public{ //default contructor
    }
    function getContents(address owner) public view returns(Art[] memory){ //get all the content of owner
        return arts[owner];
    }
    function addContent(string memory _art, string memory _watermarkedArt, uint _sellingPrice) public returns(address){ //add new content
        Art art1 = new Art(_art, _watermarkedArt, _sellingPrice);
        arts[msg.sender].push(art1);
        return address(art1);
    }
}