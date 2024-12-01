async function vigenereBruteForce(encryptedText, originalText) {
    console.log(`Brute-forcing Vigenère Cipher: encryptedText=${encryptedText}, originalText=${originalText}`);
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const maxKeyLength = 5; // Max length of key to attempt
    let vigenereProgress = 0;

    // Total combinations of keys with a specified length
    let totalAttempts = Math.pow(alphabet.length, maxKeyLength);
    let vigenereBar = document.getElementById('vigenereBar');
    vigenereBar.textContent = `Starting Vigenère Cipher brute force...`;

    // Loop over key lengths
    for (let length = 1; length <= maxKeyLength; length++) {
        let keyArray = Array(length).fill(0);

        while (true) {
            // Generate the current key from keyArray
            let currentKey = keyArray.map(index => alphabet[index]).join('');
            let decryptedText = vigenereEncrypt(encryptedText, currentKey);

            // Update progress
            vigenereProgress++;
            vigenereBar.style.width = `${(vigenereProgress / totalAttempts) * 100}%`;
            vigenereBar.textContent = `Key: ${currentKey}, Attempt: ${vigenereProgress}/${totalAttempts}`;

            // Check if decrypted text matches the original
            if (decryptedText === originalText) {
                console.log(`Vigenère Cipher broken with key ${currentKey}`);
                return { key: currentKey, decrypted: decryptedText }; // Return when match is found
            }

            // Increment key
            let position = length - 1;
            while (position >= 0) {
                if (keyArray[position] < alphabet.length - 1) {
                    keyArray[position]++;
                    break;
                } else {
                    keyArray[position] = 0;
                    position--;
                }
            }

            // If we've reset all positions, we are done
            if (position < 0) {
                break;
            }

            // Allow UI to update before continuing
            await new Promise(resolve => setTimeout(resolve, 10)); // Small delay to let the browser render
        }
    }

    console.log(`Failed to break Vigenère Cipher`);
    return null; // Return null if no match is found
}
