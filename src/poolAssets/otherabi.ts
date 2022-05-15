const poolabi:any = [
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
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "_binders",
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
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "_depositNum",
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
      "name": "_inviteReward",
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
              "name": "",
              "type": "address"
          }
      ],
      "name": "_inviter",
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
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "_userList",
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
              "internalType": "address",
              "name": "lpToken",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "rewardToken",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "rewardPerBlock",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "startBlock",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "endBlock",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "perMaxReward",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "inviteFee",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "inviteFee1",
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
      "inputs": [
          {
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "invitor",
              "type": "address"
          }
      ],
      "name": "deposit",
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
      "name": "emergencyWithdraw",
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
      "name": "getPoolExtraInfo",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "perMaxReward",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "inviteFee",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "inviteFee1",
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
          }
      ],
      "name": "getPoolInfo",
      "outputs": [
          {
              "internalType": "address",
              "name": "lpToken",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "rewardToken",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "rewardPerBlock",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "reward",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "startBlock",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "endBlock",
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
      "name": "getUserInfo",
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
              "name": "inviteReward",
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
      "name": "getUserInviteInfo",
      "outputs": [
          {
              "internalType": "address",
              "name": "invitor",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "binderCount",
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
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "poolLpBalances",
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
              "internalType": "uint256",
              "name": "pid",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "inviteFee",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "inviteFee1",
              "type": "uint256"
          }
      ],
      "name": "setPoolInviteFee",
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
              "name": "perMaxReward",
              "type": "uint256"
          }
      ],
      "name": "setPoolPerMaxReward",
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
              "name": "rewardPerBlock",
              "type": "uint256"
          }
      ],
      "name": "setPoolRewardPerBlock",
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
      "inputs": [],
      "name": "userListLength",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "length",
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
              "name": "amount",
              "type": "uint256"
          }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "stateMutability": "payable",
      "type": "receive"
  }
]
const listpoolabi:any = [
  {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "inputs": [],
      "name": "StarLPPool",
      "outputs": [
          {
              "internalType": "contract IStarLPPool",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "getAllPoolExtraInfo",
      "outputs": [
          {
              "internalType": "uint256[]",
              "name": "perMaxReward",
              "type": "uint256[]"
          },
          {
              "internalType": "uint256[]",
              "name": "inviteFee",
              "type": "uint256[]"
          },
          {
              "internalType": "uint256[]",
              "name": "inviteFee1",
              "type": "uint256[]"
          },
          {
              "internalType": "string[]",
              "name": "lpToken0Symbol",
              "type": "string[]"
          },
          {
              "internalType": "string[]",
              "name": "lpToken1Symbol",
              "type": "string[]"
          },
          {
              "internalType": "string[]",
              "name": "rewardTokenSymbol",
              "type": "string[]"
          },
          {
              "internalType": "uint256[]",
              "name": "rewardTokenDecimals",
              "type": "uint256[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "getAllPoolInfo",
      "outputs": [
          {
              "internalType": "address[]",
              "name": "lpToken",
              "type": "address[]"
          },
          {
              "internalType": "address[]",
              "name": "rewardToken",
              "type": "address[]"
          },
          {
              "internalType": "uint256[]",
              "name": "rewardPerBlock",
              "type": "uint256[]"
          },
          {
              "internalType": "uint256[]",
              "name": "amount",
              "type": "uint256[]"
          },
          {
              "internalType": "uint256[]",
              "name": "reward",
              "type": "uint256[]"
          },
          {
              "internalType": "uint256[]",
              "name": "startBlock",
              "type": "uint256[]"
          },
          {
              "internalType": "uint256[]",
              "name": "endBlock",
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
          },
          {
              "internalType": "uint256",
              "name": "start",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "length",
              "type": "uint256"
          }
      ],
      "name": "getPoolBinderInfo",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "returnLen",
              "type": "uint256"
          },
          {
              "internalType": "address[]",
              "name": "returnBinders",
              "type": "address[]"
          },
          {
              "internalType": "uint256[]",
              "name": "returnBinderAmount",
              "type": "uint256[]"
          },
          {
              "internalType": "uint256[]",
              "name": "returnBinderPending",
              "type": "uint256[]"
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
              "name": "inviteReward",
              "type": "uint256[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  }
]
export default {
  poolabi,
  listpoolabi
}