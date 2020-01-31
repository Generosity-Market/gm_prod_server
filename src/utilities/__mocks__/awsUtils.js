const { awsUtilsData } = require('../../__mocks__');

const parseUploadData = () => awsUtilsData.reqData;

const findOrCreateFile = () => {
    const res = {};
    const { imageChanges } = awsUtilsData;

    res.json = () => imageChanges;
    return res.json();
};

const getFileFromS3 = () => {
    // TODO: teturn something here...
};

const uploadFile = () => {
    // TODO: return something here...
};


module.exports = {
    parseUploadData,
    findOrCreateFile,
    getFileFromS3,
    uploadFile,
};
