<template>
    <div id="app">
        <h1> EIP 712 Demo </h1>
        <div>
            <p>Sender's name:</p>
            <input v-model="senderName" placeholder="edit me">
        </div>
        <div>
            <p>Receiver's name:</p>
            <input v-model="receiverName" placeholder="edit me">
        </div>
        <div>
            <p>Message to send:</p>
            <input v-model="message" placeholder="edit me">
        </div>
        <button v-on:click="start">Start EIP 712</button>
        <p> Signature verification result from contract: {{ result }} </p>
    </div>
</template>

<script>
import { ethers } from 'ethers';
import { abi } from './abi.js';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = "0x29E48Dbe38439f9AA689e75aE9Cb2b50F7C4db4c";
const verifier = new ethers.Contract(contractAddress, abi, provider);

const domain = {
    name: 'Ether Mail',
    version: '1',
    chainId: '',
    verifyingContract: contractAddress
};

const types = {
    Mail: [
        { name: 'from', type: 'Person' },
        { name: 'to', type: 'Person' },
        { name: 'contents', type: 'string' }
    ],
    Person: [
        { name: 'name', type: 'string' },
        { name: 'wallet', type: 'address' }
    ]
};

const mail = {
    from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826'
    },
    to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB'
    },
    contents: 'Hello, Bob!'
};

// const privkey = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("cow"));
// const wallet = new ethers.Wallet(privkey, provider);
// wallet._signTypedData(domain, types, mail)
//     .then((sig) => {
//         console.log(sig);
//         const signature = sig.substring(2);
//         const r = "0x" + signature.substring(0, 64);
//         const s = "0x" + signature.substring(64, 128);
//         const v = parseInt(signature.substring(128, 130), 16);    // The signature is now comprised of r, s, and v.
//         console.log(r, s, v);
//     });
//
// that's what you have to send to the contract in remix in oder to verify the signature
// [["Cow", "0xa588B51c6087B5382f7970681a992CE635C523ae"],["Bob", "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"], "Hello, Bob!"], "0xd2f911c8164ac3b783e283584c952173547778635bf6f983d8a6598b7e68b704", "0x00cd8ab6016bd622439032c7c0ad2985e6d867da54777aabe7ec003d582199f1", 28


export default {
    components: {},
    data: () => ({
        result: '',
        senderName: 'Cow',
        receiverName: 'Bob',
        message: 'Hi there :)',
    }),
    methods: {
        start(){
            provider.getNetwork()
                .then((network) => {
                    domain.chainId = network.chainId;
                    return signer.getAddress();
                })
                .then((address) => {
                    mail.from = {
                        name: this.senderName,
                        wallet: address
                    };
                    mail.to = {
                        name: this.receiverName,
                        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB'
                    };
                    mail.contents = this.message;
                    return signer._signTypedData(domain, types, mail);
                })
                .then((sig) => {
                    const signature = sig.substring(2);
                    const r = "0x" + signature.substring(0, 64);
                    const s = "0x" + signature.substring(64, 128);
                    const v = parseInt(signature.substring(128, 130), 16);    // The signature is now comprised of r, s, and v.
                    return verifier.functions.verify([
                            [mail.from.name, mail.from.wallet],
                            [mail.to.name, mail.to.wallet],
                            mail.contents,
                        ], 
                        r, s, v
                    );
                })
                .then((result) => {
                    console.log(`Verify in contract returns: ${result}`);
                    this.result = result[0];
                });
        }
    },
}
</script>
