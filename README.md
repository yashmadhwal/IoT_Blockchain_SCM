# A Proof-of-Concept for IoT Device Integration with Blockchain

Greetings all!
This repository will help you to setup your IoT device. 
We will tell you about all the prerequisites to run this application. Our task is divided into three parts:
1. **IoT device setup**:
a. Writing code on raspberry pi 3
b. Connecting Raspberry with Arduino Uno
2. **Backend Smart Contract:**
a. Write Smart contract
b. Test the contract
c. Deploy to the test network
3. **Frontend web Application:**
a. Launching the Web Application
b. Interating with the smart contract on the blockchain

We have done the majority of the work for you. With this guide, you will need to do some extra work, but very important that you just follow along. 
**Let's Go!**

## Setup the environment
Clone the repository and go the folder
```
git clone https://github.com/yashmadhwal/IoT_Blockchain_SCM.git
cd IoT_Blockchain_SCM
```

The folder will have two subfolders:
1. contracts
2. frontend

## Part 1: IoT Device Setup
#### Raspberry Pi Setup
Follow these steps to set up your Raspberry Pi:

1. **Obtain a Raspberry Pi:** Acquire a Raspberry Pi board along with essential components such as a power supply, microSD card, keyboard, mouse, and display.

2. **Install the Operating System:** Download the preferred operating system for your Raspberry Pi, such as Raspberry Pi OS. Follow the installation instructions provided by the official Raspberry Pi website to flash the operating system onto the microSD card.

3. **Connect Peripherals:** Connect the necessary peripherals to your Raspberry Pi, including the power supply, keyboard, mouse, and display. Ensure all connections are secure.

4. **Power On:** Plug in the power supply to start the Raspberry Pi. The device should boot up and display the operating system on the connected display.

5. **Initial Setup:** Follow the on-screen prompts to complete the initial setup of the operating system. This typically involves configuring network settings, creating a user account, and setting preferences.

6. **Update and Upgrade:** Open the terminal and run the following commands to update and upgrade the system:
    ```
    sudo apt update
    sudo apt upgrade
    ```
#### Arduino Uno Setup
The Arduino Uno is connected to the Raspberry Pi via a serial bus communication interface. This allows the Raspberry Pi to actively listen to the sensor data read by the Arduino. You have the flexibility to choose any sensor of your preference, and you can utilize any programming language supported by the Raspberry Pi to establish communication and retrieve sensor data from the Arduino.
**_For a detailed understanding of our approach, please refer to our paper. It provides comprehensive insights into the implementation and methodology employed in our project. You can understand our chosen approach in integration of the Arduino, Raspberry Pi, and sensor communication._**

## Part 2: Smart Contract Setup
This project is an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem. The project comes with a coded smart contract, a test for that contract. But before running the code, we need to do some setup (prerequisite)

##### Pre-requisite:
- [RPC](https://docs.bscscan.com/misc-tools-and-utilities/public-rpc-nodes) for connecting to blockchain network
- API key from [Binance](https://www.binance.com/en/binance-api) for contract verification. 
_Note_: In this tutorial, we will be working with Binance, therefore the above links are for binance. You can choose any network that supports EVM (e.g. Ethereum), and then accordingly change the RPC and API keys
- Private key of wallet which will be deploying the contract. The best way is to have MetaMask wallet installed in your Browser.

##### Setting up contract environment:
- Navigate to the folder
    ```
    cd contracts
    ```
- Install the required dependencies
    ```
    npm i
    ```
- Compile the contract
    ```
    npm run compile
    ```
- Test the smart contract's functionality
    ```
    npm run test
    ```
    _Note: If you see any error after running test, most likely because of .env file that you need to create. Please check the next step and then re run this code._ 
##### Deploy contract:
- Create a file `.env`:
    ```
    touch .env
    ```
- Open `.env` by running `open .env` or opening by any code editor and paste the following and save it:
    ```
    privateKey = '#Your RPC key'
    apiKey= '#Your private key'
    PROVIDER_URL = '#Your API  Key'
    ```
    Replace the API keys with your keys. _Note_: This file will be ignored by git as it is included in the .gitignore file.
- To deploy and verify the contract
    ```
    npx hardhat deploy --tags token --network bsc_testnet
    ```
    __Deploying to other networks__:
    - If you wish to deploy on some other network that supports EVM, then you need to do some configurations.
    - In the `hardhat.config.ts` file, do the network configuration as follows (for example for ETH):
        ```
        eth_scan: {
            url: process.env.PROVIDER_URL,
            accounts: [process.env.privateKey],
            verify: {
                etherscan: {
                apiKey: secrets.apiKey,
            },
          },
        },
        ```
        Note that you will require to add the RPC and API for Ethereum in `.secrets.json` accordingly.
    - To deploy, select `--network` accordingly, e.g. `--network eth_scan`.
- Once the contract is deployed, you should verify the smart contract, such that interacting with it becomes easy:
    ```
    npx hardhat etherscan-verify --network bsc_testnet
    ```
## Part 3: Running Decentralized Application:
##### Pre-requisite:
- Copy folders `deployments` and `typechain` from the _contract\_blockchain_ folder and paste them in the _fontend\_Application_ folder. 


##### Setting up contract environment:

- Go to the root folder (either by running `cd ..` in the terminal or opening a new terminal)
- Navigate to the folder
    ```
    cd frontend
    ```
- Install the required dependencies
    ```
    npm i
    ```
- Create a file `.secrets.ts`:
    ```
    touch .secrets.ts
    ```
- Open `.secrets.ts` by running `open .secrets.ts` or opening by any code editor and paste the following and save it:
    ```
    export default {
        "bsc_test" : "#Your RPC key"
    }
    ```
    Replace the API keys with your keys. _Note_: This file will be ignored by git as it is included in the .gitignore file.

- Run the application:
    ```
    npm run dev
    ```
    
- Explore the application at the deployed _local\_host_: http://127.0.0.1:5173/