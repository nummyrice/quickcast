require('dotenv');
const cloudinary = require('cloudinary').v2;

// returns a promise that creates stream with cloudinary and returns url
function uploadToCloudinary(image) {
    return new Promise((resolve, reject) => {
        let response;
        cloudinary.uploader.upload_stream({resource_type: 'image'}, (err, res) => {
            // console.log('CLOUDINARY ERROR LOG: ', err);
            if (err) return reject(err);
            return resolve(res);
        }).end(image);
    });
};

module.exports = { uploadToCloudinary };
