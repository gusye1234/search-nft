import React, { Component } from 'react'
import Navbar from './Navbar'
import NftDrop from './NftDrop'
import Web3 from 'web3'

class App extends Component {

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }

    }

    async loadBlockchainData() {
        const web3 = window.web3

        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })

        const ethBalance = await web3.eth.getBalance(this.state.account)
        this.setState({ ethBalance })
        console.log(this.state.account, this.state.ethBalance)
    }

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    nft_change = (value) => {
        this.setState({ search_nft: value });
    }

    nft_confirm = (value) => {
        this.setState({ nft_club: value });
    }


    constructor(props) {
        super(props)
        this.alchemyApiKey = "APIKEYHERE"
        this.alchemyHttpKey = "HTTPSKEYHERE"
        this.nft_change = this.nft_change.bind(this)
        this.nft_confirm = this.nft_confirm.bind(this)
        this.state = {
            search_nft: '',
            nft_club: '',
            debug: '',
            account: '',
            badgeName: '',
            ethBalance: '0',
            tokenId: '0',
            loading: true,
        }
    }

    render() {
        let content
        console.log("Hardcode address:", this.state.account)
        content = <NftDrop
            name="NFT club"
            address={this.state.account}
            valueChange={this.nft_change}
            alchemyHttp={this.alchemyHttpKey}
        />
        return (<div>
            <Navbar account={this.state.account} />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="text-center">
                {this.state.account ? <pre>Connected</pre> : <pre>Unconnected</pre>}
            </div>
            <div className="container-fluid mt-5 center">
                {content}
            </div>
        </div>)
    }

}


export default App
