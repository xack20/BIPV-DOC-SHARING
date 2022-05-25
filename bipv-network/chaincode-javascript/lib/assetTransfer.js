'use strict';

// Deterministic JSON.stringify()
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class AssetTransfer extends Contract {


    async GetID(ctx) {
        const arr1 = ctx.clientIdentity.getID().split('::');
        const arr2 = arr1[1].split('/');
        const arr3 = arr2[4].split('=');
        return arr3[1];
    }

    async InitLedger(ctx) {

        const user = await this.GetID(ctx);

        const assets = [
            {
                documentNo : '672',
                documentType : 'Contract Document',
                dateReceived : '03/01/2021',
                projectStage : 'Inception',
                documentSize : '1268 KB',
                receivedBy : user,
                sentBy : 'Taizhou Haineng New Energy Group Co., Ltd. (Client)',
                mainContent : 'Design Consulting Contract',
                documentLink : 'https://www.google.com',
                lastModification: (new Date(Date.now())).toUTCString(),
            },
            {
                documentNo : '673',
                documentType : 'Report about the design (PPT)',
                dateReceived : '03/01/2021',
                projectStage : 'Design',
                documentSize : '62971 KB',
                receivedBy : user,
                sentBy : 'Taizhou Haineng New Energy Group Co., Ltd. (Client)',
                mainContent : 'Report about the design (PPT)',
                documentLink : 'https://www.facebook.com',
                lastModification: (new Date(Date.now())).toUTCString(),
            },
        ];

        for (const asset of assets) {
            asset.docType = 'asset';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(asset.documentNo, Buffer.from(stringify(sortKeysRecursive(asset))));
        }
    }

    // CreateAsset issues a new asset to the world state with given details.
    async CreateAsset(ctx, documentNo, documentType, projectStage, documentSize, mainContent, documentLink) {

        const user = await this.GetID(ctx);

        const exists = await this.AssetExists(ctx, documentNo);
        if (exists) {
            throw new Error(`The asset ${documentNo} already exists`);
        }

        const asset = {
            documentNo: documentNo,
            documentType: documentType,
            dateReceived: "",
            projectStage: projectStage,
            documentSize: documentSize,
            receivedBy: user,
            sentBy: "",
            mainContent: mainContent,
            documentLink: documentLink,
            lastModification: (new Date(Date.now())).toUTCString(),
            transferMessage: "",
        };
        //we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(documentNo, Buffer.from(stringify(sortKeysRecursive(asset))));
        return JSON.stringify(asset);
    }

    // ReadAsset returns the asset stored in the world state with given id.
    async ReadAsset(ctx, id) {
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }


    async GetID(ctx) {
        const arr1 = ctx.clientIdentity.getID().split('::');
        const arr2 = arr1[1].split('/');
        const arr3 = arr2[4].split('=');
        return arr3[1];
    }

    async GetOwner(ctx, id) {
        const assetString = await this.ReadAsset(ctx, id);
        const asset = JSON.parse(assetString);
        return asset.receivedBy;
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async UpdateAsset(ctx, documentNo, documentType, projectStage, documentSize, mainContent, documentLink) {


        const user = await this.GetID(ctx);
        const owner = await this.GetOwner(ctx, documentNo);
        if(user !== owner) {
            throw new Error(`You are not authorized to perform this action`);
        }

        const exists = await this.AssetExists(ctx, documentNo);
        if (!exists) {
            throw new Error(`The asset ${documentNo} does not exist`);
        }

        const assetString = await this.ReadAsset(ctx, documentNo);
        const asset = JSON.parse(assetString);

        // overwriting original asset with new asset
        asset.documentType = documentType;
        asset.projectStage = projectStage;
        asset.documentSize = documentSize;
        asset.mainContent = mainContent;
        asset.documentLink = documentLink;
        asset.lastModification = (new Date(Date.now())).toUTCString();

        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return await ctx.stub.putState(documentNo, Buffer.from(stringify(sortKeysRecursive(asset))));
    }

    // DeleteAsset deletes an given asset from the world state.
    async DeleteAsset(ctx, id) {

        const user = await this.GetID(ctx);
        const owner = await this.GetOwner(ctx, id);
        if(user !== owner) {
            throw new Error(`You are not authorized to perform this action`);
        }

        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return await ctx.stub.deleteState(id);
    }

    // AssetExists returns true when asset with given ID exists in world state.
    async AssetExists(ctx, documentNo) {
        const assetJSON = await ctx.stub.getState(documentNo);
        return assetJSON && assetJSON.length > 0;
    }


    async GetHistoryForAsset(ctx, documentNo) {
        const exists = await this.AssetExists(ctx, documentNo);
        if (!exists) {
            throw new Error(`The asset ${documentNo} does not exist`);
        }
        const resultsIterator = await ctx.stub.getHistoryForKey(documentNo);
        const results = [];
        while (true) {
            const res = await resultsIterator.next();
            if (res.value && res.value.value.toString()) {
                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                results.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await resultsIterator.close();
                console.info(results);
                return JSON.stringify(results);
            }
        }
    }

    // TransferAsset updates the owner field of asset with given id in the world state.
    async TransferAsset(ctx, documentNo, newOwner, transferMessage) {

        const user = await this.GetID(ctx);
        const owner = await this.GetOwner(ctx, documentNo);

        // return user+" "+owner + " "+newOwner;

        if(user !== owner) {
            throw new Error(`You are not authorized to perform this action`);
        }

        
        const assetString = await this.ReadAsset(ctx, documentNo);

        const asset = JSON.parse(assetString);
        
        asset.sentBy = user;
        asset.receivedBy = newOwner;
        asset.dateReceived = (new Date(Date.now())).toUTCString();
        asset.lastModification = asset.dateReceived;
        asset.transferMessage = transferMessage;

        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
         return await ctx.stub.putState(asset.documentNo, Buffer.from(stringify(sortKeysRecursive(asset))));
    }

    // GetAllAssets returns all assets found in the world state.
    async GetAllAssets(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
}

module.exports = AssetTransfer;
