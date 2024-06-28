// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

//Evm,Ethereum Virtual Machine
//Avalanche,Fantom,Polygon

contract SimpleStorage {
    //this is let null
    uint256 public favouriteNumber;
    //Mapping
    mapping(string => uint256) public nameToFavoriteNumber;
    //Struct Type
    struct People {
        uint256 favouriteNumber;
        string name;
    }

    People[] public people;

    // modifies the blockchain

    function store(uint256 _favouriteNumber) public virtual {
        favouriteNumber = _favouriteNumber;
        retrieve();
    }

    //view,pure don't modify the blockchain
    function retrieve() public view returns (uint256) {
        return favouriteNumber;
    }

    //calldata,memory,storage   where to store data in solidity
    function add(string memory _name, uint256 _favouriteNumber) public {
        people.push(People(_favouriteNumber, _name));
        nameToFavoriteNumber[_name] = _favouriteNumber;
    }
}

//0xD10a66D6eb533f0B28AFa94146FA98997359B754
