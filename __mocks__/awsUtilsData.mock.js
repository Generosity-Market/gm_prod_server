module.exports = {
    reqData: {
        bucket_name: 'cause',
        profile_params: {
            path: '/var/folders/8j/_vp7kgt55xd6j_797fpchg6m0000gn/T/PT4lWjFzvfU2PKg_Sl-W6l6s.jpg',
            type: 'image/jpeg',
            name: 'profileImages/IMG_20150716_001102.jpg',
        },
        cover_params: {
            path: '/var/folders/8j/_vp7kgt55xd6j_797fpchg6m0000gn/T/jwp33h1yubTFp89s9QOCAQe4.jpg',
            type: 'image/jpeg',
            name: 'coverImages/christopher-burns-271403-unsplash.jpg',
        },
        fields: {
            // NOTE: State needs to be in the form of a string,
            // bc that is what the form parser returns.
            // There is a JSON.parse method on this returned string...
            // if returned as an object that method blows up the test
            state: [
                '{ \n'
                + '  "user_id": 1,\n'
                + '  "tax_id": "Jx84Lod#250kskl",\n'
                // eslint-disable-next-line quotes
                + `  "name": "Family Team Expansion", \n`
                + '  "type": "Adoption", \n'
                + '  "goal_amount": 40000, \n'
                + '  "featured": false, \n'
                + '  "description": "We\'re adopting!!", \n'
                + '  "purpose": "This will provide for the adoption fees (including all paperwork fees), baby supplies, and food for our munchkin.", \n'
                + '  "icon": "Diaper", \n'
                + '  "cover_image": "khendi-lee-25583.jpg", \n'
                + '  "profile_image": "jessica-castro-516921.jpg", \n'
                + '  "round_image": true, \n'
                + '  "white_text": true\n'
                + '}',
            ],
            bucket: ['cause'],
        },
    },
    imageChanges: {
        profile_image: 'https://generosity-market-cause-images.s3.amazonaws.com/profileImages/IMG_20150716_001102.jpg',
        cover_image: 'https://generosity-market-cause-images.s3.amazonaws.com/coverImages/christopher-burns-271403-unsplash.jpg',
    },
};
