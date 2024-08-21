// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol";
import "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";

contract LikeResolver is SchemaResolver {
    mapping(address => mapping(string => bool)) public hasLiked;

    constructor(IEAS eas) SchemaResolver(eas) {}

    function onAttest(
        Attestation calldata attestation,
        uint256 value
    ) internal override returns (bool) {
        (address userAddress, string memory productId) = abi.decode(
            attestation.data,
            (address, string)
        );

        if (hasLiked[userAddress][productId]) {
            return false;
        }

        hasLiked[userAddress][productId] = true;

        return true;
    }

    function onRevoke(
        Attestation calldata attestation,
        uint256 value
    ) internal override returns (bool) {
        (address userAddress, string memory productId) = abi.decode(
            attestation.data,
            (address, string)
        );

        if (!hasLiked[userAddress][productId]) {
            return false;
        }

        hasLiked[userAddress][productId] = false;

        return true;
    }
}
