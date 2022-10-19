// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

/* Errors */

error Payments_AmntLessMin();

contract SacPayments {

    struct TipInfo {
        address user;
        uint256 amount;
    }

    mapping(address => TipInfo[]) public profiles;

    function tip(address payable tipAddress) public payable {

        profiles[tipAddress].push(TipInfo(msg.sender, msg.value));

        tipAddress.transfer(msg.value);

    }

}
