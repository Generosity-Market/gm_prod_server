// TODO: Do we need these???

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     User.findOne({
//         where: {
//             id,
//         },
//     })
//         .then((user) => {
//             if (user == null) {
//                 done(new Error('Wrong user id'));
//             }

//             done(null, user);
//         });
// });
