export const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "wallet",
								"type": "address"
							}
						],
						"internalType": "struct Verifier.Person",
						"name": "from",
						"type": "tuple"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "wallet",
								"type": "address"
							}
						],
						"internalType": "struct Verifier.Person",
						"name": "to",
						"type": "tuple"
					},
					{
						"internalType": "string",
						"name": "contents",
						"type": "string"
					}
				],
				"internalType": "struct Verifier.Mail",
				"name": "mail",
				"type": "tuple"
			},
			{
				"internalType": "bytes32",
				"name": "r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			},
			{
				"internalType": "uint8",
				"name": "v",
				"type": "uint8"
			}
		],
		"name": "verify",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]