window.addEventListener("load", () => {
    const randomStringFromServer = "randomstringfromserver";
    const publicKeyCredentialCreationOptions = {
        challenge: Uint8Array.from(
            randomStringFromServer, c => c.charCodeAt(0)),
        rp: {
            name: "my company",
            id: "localhost",
        },
        user: {
            id: Uint8Array.from(
                "UZSL85T9AFC", c => c.charCodeAt(0)),
            name: "user01@mydomain.com",
            displayName: "user01",
        },
        authenticatorSelection:{
            AuthenticatorAttachment: "cross-platform",
            userVerification: "required"
        },
        pubKeyCredParams: [
            { alg: -7, type: "public-key" },  // ES256
            { alg: -257, type: "public-key" },// RS256, for windows hello
        ],
        timeout: 60000,
        attestation: "none"
    };

    (async () => {
        const credential = await navigator.credentials.create({
            publicKey: publicKeyCredentialCreationOptions
        });
        console.log(credential);

        ///////////////////////////// send credential to server side /////////////////////

        // decode the clientDataJSON into a utf-8 string
        const utf8Decoder = new TextDecoder('utf-8');
        const decodedClientData = utf8Decoder.decode(
            credential.response.clientDataJSON)

        // parse the string as an object
        const clientDataObj = JSON.parse(decodedClientData);

        console.log(clientDataObj);

        const decodedAttestationObj = CBOR.decode(credential.response.attestationObject);

    })();

});
