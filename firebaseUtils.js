function printPremise(inputPremise){
    inputPremise.then(function(message) {
        console.log(message);
    });
}

function checkForDuplicateMessage(message, hashMap) {
    return Object.values(hashMap).some(item => item.message === message.message);
}

function checkForDuplicateSnapshot(snapshot, message) {
    const data = snapshot.val();
    if(data === null){
        return false;
    }
    const hashMap = JSON.parse(JSON.stringify(data));
    return checkForDuplicateMessage(hashMap, message);
}

module.exports = {
    printPremise,
    checkForDuplicateMessage,
    checkForDuplicateSnapshot
}