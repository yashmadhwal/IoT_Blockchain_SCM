const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("@ethersproject/bignumber");
const helpers = require("@nomicfoundation/hardhat-network-helpers")

describe("Deployment", function () {

    let iotc
    let owner

    before(async () => {
        [contractOwner, ...actors] = await ethers.getSigners();
        const InternetOfThingsContract = await ethers.getContractFactory("InternetOfThingsContractMonitoring");
        iotc = await InternetOfThingsContract.deploy();
    });


    describe("Basic Deployment", function () {
        it(`Contract is deployed, i.e. address is not null`, async function () {
            expect(iotc.address).not.equal(0);
        });

        it('Checking Ownership of the contract', async function () {
            expect(await iotc.owner()).equal(contractOwner.address)
        });
    });

    describe("Workflow Deployment", async function () {

        // Checking Access Control
        it('Only Admin can grant access to address', async function () { 
            await expect(iotc.connect(actors[0]).grantAccess(actors[0].address)).revertedWith('Ownable: caller is not the owner');
            await expect(iotc.connect(contractOwner).grantAccess(actors[0].address));
        });

        it('Cannot regrant access', async function () { 
            await expect(iotc.connect(contractOwner).grantAccess(actors[0].address)).revertedWith('Already has access');
        });

        it('Only Admin can revoke access to address', async function () { 
            await expect(iotc.connect(actors[0]).revokeAccess(actors[0].address)).revertedWith('Ownable: caller is not the owner');
            await expect(iotc.connect(contractOwner).revokeAccess(actors[0].address));
        });

        it('Cannot revoke access on non-grantted address', async function () { 
            await expect(iotc.connect(contractOwner).revokeAccess(actors[0].address)).revertedWith('Already has no access');
        });

        // Granting Access to actor[0].address
        it('Granting Access to actor[0].address', async function () { 
            await iotc.connect(contractOwner).grantAccess(actors[0].address);
        });
        
        
        // NOTE: WE can Initalize product when when the zones are not set
        it(`Cannot Initializing product if not a producer`, async function () {
            await expect(iotc.initializeProduct('Moscow',actors[10].address,actors[20].address)).revertedWith('No Access: not a producer');
        });

        it(`Initializing product by actor[0].address
            _destination: Moscow
            _recipient: actors[10].address
            _transport: actors[20].address
            ID:1`, async function () {
            await iotc.connect(actors[0]).initializeProduct('Moscow',actors[10].address,actors[20].address);
            const product = await iotc.productInformation(1);
            expect(product.destination).to.equal('Moscow')
            expect(product.sender).to.equal(actors[0].address)
            expect(product.recipient).to.equal(actors[10].address)
            expect(product.transporter).to.equal(actors[20].address)
            expect(product.received).to.equal(false)
        });

        it('Cannot Mark while zones are not set', async function () { 
            await expect(iotc.connect(actors[20]).productMovement(1,300)).revertedWith('Zones not yet defined');
        });

        // Setting Zones of the system
        it(`Non owner cannot set the Zones`, async function () {
            await expect(iotc.connect(actors[0]).setZones(600,800)).revertedWith('Ownable: caller is not the owner');
        });

        it(`Call transaction to set zones`, async function () {
            await iotc.setZones(600,800);
        });

        it('Non-authorised Address cannot call transaction', async function () { 
            await expect(iotc.connect(actors[10]).productMovement(1,300)).revertedWith('Not authorised');
        });

        // Trying 
        it('Cannot track product movement (ID: 2) before Initializing', async function () { 
            await expect(iotc.connect(actors[21]).productMovement(2,300)).revertedWith('Not authorised');
        });

        it(`Initializing product by actor[1].address
            _destination: Berlin
            _recipient: actors[11].address
            _transport: actors[21].address
            ID:2`, async function () {
            await iotc.connect(actors[0]).initializeProduct('Berlin',actors[11].address,actors[21].address);
            const product = await iotc.productInformation(2);
            expect(product.destination).to.equal('Berlin')
            expect(product.sender).to.equal(actors[0].address)
            expect(product.recipient).to.equal(actors[11].address)
            expect(product.transporter).to.equal(actors[21].address)
            expect(product.received).to.equal(false)
        });

        // Marking product Id:1 and Id:2 on Journey

        it('Making first Time stamp', async function () {
            await helpers.time.increase(10);
            await iotc.connect(actors[20]).productMovement(1,1000);
            await iotc.connect(actors[21]).productMovement(2,1000);          
        });

        it(`making 10 transactions for each product id 1 and id 2, in a loop`, async function () {
            for (let i = 0; i < 10; i++) {
                // Increase time stamp
                await helpers.time.increase(10);
                rand_1 = Math.floor(Math.random() * (900 - 500 + 1)) + 500;
                await iotc.connect(actors[20]).productMovement(1,rand_1);

                rand_2 = Math.floor(Math.random() * (900 - 500 + 1)) + 500;
                await iotc.connect(actors[21]).productMovement(2,rand_2);
            }
        });

        it('Getting Product information ',async function(){
            const temp = await iotc.getProductionJourney(1);
            expect(temp.length).not.equal(0)
        })

        // Receiveing product ID:1
        it(`Only assigned receiver can receive product
        ID:1,
        receiver: actors[10]`,async function(){
           await expect(iotc.receiveProduct(1)).revertedWith('Not correct receipent');
           await iotc.connect(actors[10]).receiveProduct(1);
        });

        it('Cannot mark product 1 becuase delivered', async function () {
            await helpers.time.increase(10);
            await expect(iotc.connect(actors[20]).productMovement(1,1000)).revertedWith('Product already delivered');
        });

        it('Adding two more log for product id:2', async function () {
            await helpers.time.increase(10);
            await iotc.connect(actors[21]).productMovement(2,1000);
            await helpers.time.increase(10);
            await iotc.connect(actors[21]).productMovement(2,950);
        });

        it(`Receiving 
        ID:2,
        receiver: actors[11]`,async function(){
           await iotc.connect(actors[11]).receiveProduct(2);
        });

        it(`Checking logs for both`,async function(){
           temp_1 = await  iotc.getProductionJourney(1)
           expect(temp_1.length).equal(11)
           temp_2 = await  iotc.getProductionJourney(2)
           expect(temp_2.length).equal(13)
        });
    });
});