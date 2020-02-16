// the encrypted key
key = "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92";

function securityCheck(){
    input = document.getElementById('password').value;
    if (CryptoJS.SHA256(input).toString() != key) {
        alert('Wrong password!');
    } else{
        document.getElementById('security').style.display = 'none';
        document.getElementById('dashboard').style.display = '';
        return JSON.parse((CryptoJS.AES.decrypt(encryptedData, input)).toString(CryptoJS.enc.Utf8));;
    }
}

