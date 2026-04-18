const ImageKit = require('@imagekit/nodejs');

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

const uploadFile = async (buffer) => {
  try {    
      const response = await client.files.upload({
        file: buffer.toString("base64"),
        fileName: 'file',
      });
      return response;  
  } catch (error) {
    console.error("Error uploading file to ImageKit:", error);
    throw error;
  }
}

module.exports = { uploadFile };