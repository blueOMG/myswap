const poolList_abi:any = [
  {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
          }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
  },
  {
      "inputs": [],
      "name": "_nft",
      "outputs": [
          {
              "internalType": "contract INFT",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "_nftLastRewardTime",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "_userClaimedReward",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "rewardToken",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "rewardPerNFT",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "startTime",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "endTime",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "durationPerReward",
              "type": "uint256"
          }
      ],
      "name": "addPool",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
          }
      ],
      "name": "claim",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "nftId",
              "type": "uint256"
          }
      ],
      "name": "claim",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "claimBalance",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "token",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "claimToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "getAllPoolInfo",
      "outputs": [
          {
              "internalType": "address[]",
              "name": "rewardToken",
              "type": "address[]"
          },
          {
              "internalType": "uint256[]",
              "name": "rewardPerNFT",
              "type": "uint256[]"
          },
          {
              "internalType": "uint256[]",
              "name": "startTime",
              "type": "uint256[]"
          },
          {
              "internalType": "uint256[]",
              "name": "endTime",
              "type": "uint256[]"
          },
          {
              "internalType": "uint256[]",
              "name": "durationPerReward",
              "type": "uint256[]"
          },
          {
              "internalType": "uint256[]",
              "name": "rewardTokenDecimals",
              "type": "uint256[]"
          },
          {
              "internalType": "string[]",
              "name": "rewardTokenSymbol",
              "type": "string[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
          }
      ],
      "name": "getPoolInfo",
      "outputs": [
          {
              "internalType": "address",
              "name": "rewardToken",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "rewardPerNFT",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "startTime",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "endTime",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "durationPerReward",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "getUserAllPoolInfo",
      "outputs": [
          {
              "internalType": "uint256[]",
              "name": "amount",
              "type": "uint256[]"
          },
          {
              "internalType": "uint256[]",
              "name": "pending",
              "type": "uint256[]"
          },
          {
              "internalType": "uint256[]",
              "name": "claimed",
              "type": "uint256[]"
          },
          {
              "internalType": "uint256[]",
              "name": "newRewardTime",
              "type": "uint256[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "getUserPoolInfo",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "pending",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "claimed",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "newRewardTime",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "owner",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "nftId",
              "type": "uint256"
          }
      ],
      "name": "pendingReward",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "reward",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "pendingReward",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "reward",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "pendingRewardTime",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "newRewardTime",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "nftId",
              "type": "uint256"
          }
      ],
      "name": "pendingRewardTime",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "newRewardTime",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "poolLength",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "receiveAddress",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "addr",
              "type": "address"
          }
      ],
      "name": "setNFTAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "rewardPerNFT",
              "type": "uint256"
          }
      ],
      "name": "setPoolRewardPerNFT",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "rewardToken",
              "type": "address"
          }
      ],
      "name": "setPoolRewardToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "startTime",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "endTime",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "durationPerReward",
              "type": "uint256"
          }
      ],
      "name": "setPoolTime",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "addr",
              "type": "address"
          }
      ],
      "name": "setReceiveAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
          }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "stateMutability": "payable",
      "type": "receive"
  }
]
export default {
  poolList_abi
}