const crypto = require('crypto');
const fs = require('fs')

const MC4_AES256CBC_KEY = Buffer.from('33303463363532386636353963373636313130323339613531636c3564643963', 'hex');
const MC4_AES256CBC_IV = Buffer.from('u@}kzW2u[u(8DWar');

function decryptFile(filePath) {
    try {
        const base64EncodedData = fs.readFileSync(filePath, 'utf8');
        console.log(`[*] Base64 Encoded Size: ${base64EncodedData.length} bytes`);

        const binData = Buffer.from(base64EncodedData, 'base64');
        const decipher = crypto.createDecipheriv('aes-256-cbc', MC4_AES256CBC_KEY, MC4_AES256CBC_IV);

        let decryptedData = Buffer.concat([decipher.update(binData), decipher.final()]);
        
        console.log(`[*] Total Decrypted Size: ${decryptedData.length} bytes`);
        console.log('[*] Decrypted File Successfully!\n');

        // Convert the Buffer to a UTF-8 encoded string
        const utf8DecodedData = decryptedData.toString('utf8');
        
        return utf8DecodedData;
    } catch (error) {
        console.error('Error reading or decrypting the file:', error.message);
    }
}

function writetoFile(data) {
    fs.writeFile('./[Output File Name]', data, err => {
        if (err) {
            console.log(err)
        }
        console.log("[*] Written To File Successfully")
    })
}

const encryptedFilePath = './[File Name].mc4';
const decryptedData = decryptFile(encryptedFilePath);
writetoFile(decryptedData);