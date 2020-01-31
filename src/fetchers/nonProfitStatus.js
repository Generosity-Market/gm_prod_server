const fetch = require('node-fetch');

const verificationURL = (tax_id) => `https://projects.propublica.org/nonprofits/api/v2/organizations/${tax_id}.json`;

const verifyNonProfitStatus = async (URL, tax_id) => {
    const url = verificationURL(tax_id);
    try {
        const response = await fetch(url);
        const json = await response.json();

        if (!response.error) {
            console.log(json);
        } else {
            console.log(response.error);
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = verifyNonProfitStatus;

// const Fetchers = {
//   verifyNonProfitStatus:
//   fetch(searchURL)
//   .then(response => response.json())
//   .then(data => {

//     if (data.organization.careofname.includes( director.toUpperCase() ) ) {

//       models.Organization.create(newOrg)
//       .then(org => {
//           models.Preference.create({orgID: org.id, roundImage: roundImage, whiteText: whiteText})
//           .then(preferences => {
//               org['Preferences'] = preferences;
//               res.status('201').send({Organization: org});
//           })
//       })

//     } else {
//       res.status(403).send({error: "Organization cannot be verified."})
//     }
//   }),

// }

// module.exports = Fetchers;
