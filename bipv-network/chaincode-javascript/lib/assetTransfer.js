/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Deterministic JSON.stringify()
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class AssetTransfer extends Contract {

    async InitLedger(ctx) {
        const assets = [
            {
                documentNo : '672',
                documentType : 'Contract Document',
                dateReceived : '03/01/2021',
                projectStage : 'Inception',
                documentSize : '1268 KB',
                receivedBy : 'Fanzai (Design consultant) ',
                sentBy : 'Taizhou Haineng New Energy Group Co., Ltd. (Client)',
                mainContent : 'Design Consulting Contract',
                documentLink : 'https://www.google.com',
            },
            {
                documentNo : '673',
                documentType : 'Report about the design (PPT)',
                dateReceived : '03/01/2021',
                projectStage : 'Design',
                documentSize : '62971 KB',
                receivedBy : 'Fanzai (Design consultant) ',
                sentBy : 'Taizhou Haineng New Energy Group Co., Ltd. (Client)',
                mainContent : 'Report about the design (PPT)',
                documentLink : 'https://www.facebook.com',
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
    async CreateAsset(ctx, documentNo, documentType, dateReceived, projectStage, documentSize, receivedBy, sentBy, mainContent, documentLink) {
        const exists = await this.AssetExists(ctx, documentNo);
        if (exists) {
            throw new Error(`The asset ${documentNo} already exists`);
        }

        const asset = {
            documentNo: documentNo,
            documentType: documentType,
            dateReceived: dateReceived,
            projectStage: projectStage,
            documentSize: documentSize,
            receivedBy: receivedBy,
            sentBy: sentBy,
            mainContent: mainContent,
            documentLink: documentLink,
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
        const clientIdentity = ctx.clientIdentity;
        return clientIdentity.getID();
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async UpdateAsset(ctx, documentNo, documentType, dateReceived, projectStage, documentSize, receivedBy, sentBy, mainContent, documentLink) {
        const exists = await this.AssetExists(ctx, documentNo);
        if (!exists) {
            throw new Error(`The asset ${documentNo} does not exist`);
        }

        // overwriting original asset with new asset
        const updatedAsset = {
            documentNo: documentNo,
            documentType: documentType,
            dateReceived: dateReceived,
            projectStage: projectStage,
            documentSize: documentSize,
            receivedBy: receivedBy,
            sentBy: sentBy,
            mainContent: mainContent,
            documentLink: documentLink,
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(documentNo, Buffer.from(stringify(sortKeysRecursive(updatedAsset))));
    }

    // DeleteAsset deletes an given asset from the world state.
    async DeleteAsset(ctx, id) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }

    // AssetExists returns true when asset with given ID exists in world state.
    async AssetExists(ctx, documentNo) {
        const assetJSON = await ctx.stub.getState(documentNo);
        return assetJSON && assetJSON.length > 0;
    }

    // TransferAsset updates the owner field of asset with given id in the world state.
    // async TransferAsset(ctx, id, newOwner) {
    //     const assetString = await this.ReadAsset(ctx, id);
    //     const asset = JSON.parse(assetString);
    //     const oldOwner = asset.Owner;
    //     asset.Owner = newOwner;
    //     // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    //     await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
    //     return oldOwner;
    // }

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
