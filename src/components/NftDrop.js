import React, { Component } from 'react';
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import AsyncSelect from 'react-select/async';
import "./style.css"
const nftOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    // { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    // { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    // { value: 'purple', label: 'Purple', color: '#5243AA' },
    // { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    // { value: 'orange', label: 'Orange', color: '#FF8B00' },
    // { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    // { value: 'green', label: 'Green', color: '#36B37E' },
    // { value: 'forest', label: 'Forest', color: '#00875A' },
    // { value: 'slate', label: 'Slate', color: '#253858' },
    // { value: 'silver', label: 'Silver', color: '#666666' },
];

const filterNft = (inputValue) => {
    return nftOptions.filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
};

const loadOptions = (
    inputValue,
    callback
) => {
    setTimeout(() => {
        callback(filterNft(inputValue));
    }, 1000);
};

export default class NftDrop extends Component {
    async loadNfts() {
        if (this.address !== this.props.address) {
            this.address = this.props.address
            const alchemy_web3 = createAlchemyWeb3(this.props.alchemyHttp)
            const NFTs = await alchemy_web3.alchemy.getNfts({
                owner: this.props.address
            })
            this.setState({ NFTs: NFTs })
            var NFTs_metadata = []
            for (const nft of NFTs.ownedNfts) {
                const nft_metadata = await alchemy_web3.alchemy.getNftMetadata({
                    contractAddress: nft.contract.address,
                    tokenId: nft.id.tokenId,
                });
                NFTs_metadata.push(nft_metadata)
            }
            this.setState({ NFTs_metadata: NFTs_metadata })
            console.log("Load new address", this.address)
        }
    }
    // async componentWillMount() {
    //     this.loadNfts();
    // }
    handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({ inputValue });
        this.props.valueChange(this.state.inputValue);
        return inputValue;
    };
    constructor(props) {
        super(props)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.address = ''
        this.state = {
            inputValue: '',
            NFTs: '',
            NFTs_metadata: ''
        }
    }
    render() {
        // return (
        //     <div>
        //         <pre>{this.props.name}: "{this.state.inputValue}"</pre>
        //         <AsyncSelect
        //             cacheOptions
        //             loadOptions={loadOptions}
        //             defaultOptions
        //             onInputChange={this.handleInputChange}
        //         />
        //     </div>
        // );
        this.loadNfts();

        if (this.state.NFTs_metadata) {
            console.log("See me", this.state.NFTs.ownedNfts[0].title)
            if (this.state.NFTs_metadata.length === 0) {
                return (
                    <div id="nfts" className="text-lg-center">
                        You have no NFTs!🤣
                    </div>
                )
            }
            return (
                <div id="nfts" className="flex gap-7 flex-wrap align-items-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {this.state.NFTs_metadata.map(
                        (nft_metadata, index) => {
                            let nft_title = nft_metadata.title;
                            if (!nft_title) {
                                nft_title = "No name"
                            }
                            if (nft_title.length > 20) {
                                nft_title = nft_title.slice(0, 15) + "..."
                            }
                            return (
                                <section>
                                    <h1 href={nft_metadata.tokenUri.gateway} className="font-bold bg-yellow-500 text-white text-center rounded-t-md"> {nft_title} </h1>
                                    {nft_metadata.metadata.image ?
                                        <a href={nft_metadata.tokenUri.gateway} target="_blank">
                                            <img className="rounded-b-md w-40 h-40" src={nft_metadata.metadata.image} alt="nft image"
                                                onError={event => {
                                                    event.target.src = require("../404.png")
                                                    event.onerror = null
                                                }}></img>
                                        </a>
                                        : <a href={nft_metadata.tokenUri.gateway} target="_blank">
                                            <img className="rounded-b-md w-40 h-40" src={require("../404.png")} alt="empty"></img></a>

                                    }
                                </section>
                            )
                        }
                    )
                    }
                </div>
            )
        } else {
            return (<div id="nfts" className="flex gap-7 flex-wrap"></div>)
        }
    }
}