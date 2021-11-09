const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

// // TEST
// router.post('/test', (req, res) => {
//     const photo = req.body.files;
//     console.log(photo);
//     res.json({message: "you ar da bom"});
// });


module.exports = router;



// fetch('/api/test', {
    //     method: "POST",
    //     headers: {
        //       "Content-Type": "application/json",
        //       "XSRF-TOKEN": 'oHwW0HIx-YbBvOw2RQDBZVxEUNj8gvxIltJA'
        //     },
        //     body: JSON.stringify({ hello: 'world' })
        //   }).then(res => res.json()).then(data => console.log(data));

        // // GET /api/set-token-cookie
        // const asyncHandler = require('express-async-handler');
        // const { setTokenCookie } = require('../../utils/auth.js');
        // const { User } = require('../../db/models');
        // router.get('/set-token-cookie', asyncHandler(async (req, res) => {
        //     const user = await User.findOne({
        //         where: {
        //             username: 'Demo-lition'
        //         },
        //     })
        //     setTokenCookie(res, user);
        //     return res.json({ user });
        // }));


        // // GET /api/restore-user
        // const { restoreUser } = require('../../utils/auth.js');
        // router.get('/restore-user', restoreUser, (req, res) => {
        //     return res.json(req.user);
        //   }
        // );

        // // GET /api/require-auth
        // const { requireAuth } = require('../../utils/auth.js');
        // router.get('/require-auth',requireAuth, (req, res) => {
        //     return res.json(req.user);
        //   }
        // );
