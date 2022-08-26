<div align="center">
  <h1>Search Your NFTs</h1>
  <p><strong><a href="https://search-nft.vercel.app/">demo</a></strong></p>
</div>


Connect to your Metamask, and display all your NFTs in a second. The demo is deployed on [Vercel](https://vercel.com) and used APIs from [alchemy](https://www.alchemy.com).




## Quick Start

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). In the project directory, you can run: `npm install` to install the necessary dependencies.

To run locally, you need to apply for your own alchemy tokens: check out this nice [blog](https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f). After that, you should have a API key and a HTTPs key. Create a `.env` file under the project root, with contents like:

```
REACT_APP_alchemyApiKey = <your API key>
REACT_APP_alchemyHttpKey = <your https key>
```

*(Note that the https key is the one starts with `https://...`)*

`npm start` will runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes. You may also see any lint errors in the console.
