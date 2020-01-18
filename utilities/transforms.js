// Creates a new object but removes the excluded properties
exports.createNewObject = (obj, exclusions) => {
    const keys = Object.keys(obj);
    const updatedObject = {};

    for (let i = 0; i < keys.length; i++) {
        if (!exclusions.includes(keys[i])) {
            updatedObject[keys[i]] = obj[keys[i]];
        }
    }
    return updatedObject;
};

// Gets excluded properties based on the table name
exports.getExclusions = (excludes) => {
    switch (excludes) {
        case 'user':
            return ['name', 'email', 'password', 'street', 'city', 'state', 'zipcode', 'phone', 'backgroundImage', 'mainImage'];

        case 'preferences':
            return ['roundImage', 'whiteText'];

        case 'causes':
            return ['user_id', 'org_id', 'name', 'type', 'amount', 'description', 'purpose', 'icon', 'featured', 'backgroundImage', 'mainImage'];

        case 'organizations':
            return ['userId', 'taxId', 'name', 'short_name', 'heading', 'mission', 'email', 'site_url', 'backgroundImage', 'mainImage'];

        case 'donations':
            return ['user_id', 'cause_id', 'amount'];

        default:
            return [];
    }
};
