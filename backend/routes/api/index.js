const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const companyRouter = require('./company.js');
const actingGig = require('./actingGig.js');
const gigrole = require('./gigrole.js');
const actorPortfolio = require('./actorPortfolio.js');
const portfolioGallery = require('./portfoliogallery.js')
const tag = require('./tag.js')
const application = require('./application.js')
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/company', companyRouter);
router.use('/actingGig', actingGig);
router.use('/gigrole', gigrole);
router.use('/actorPortfolio', actorPortfolio);
router.use('/portfolioGallery', portfolioGallery);
router.use('/tag', tag)
router.use('/application', application)


// TEST
router.post('/test', (req, res) => {
    // const photo = req.body.files;
    // console.log(photo);
    res.json({message: "you ar da bom"});
});


module.exports = router;



// fetch('/api/test', {
//         method: "POST",
//         headers: {
//               "Content-Type": "application/json",
//               "XSRF-TOKEN": 'oHwW0HIx-YbBvOw2RQDBZVxEUNj8gvxIltJA'
//             },
//             body: JSON.stringify({ hello: 'world' })
//           }).then(res => res.json()).then(data => console.log(data));

// GET /api/set-token-cookie
router.get('/set-token-cookie', asyncHandler(async (req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        },
    })
    setTokenCookie(res, user);
    return res.json({ user });
}));


// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');
router.get('/restore-user', restoreUser, (req, res) => {
    return res.json(req.user);
    }
);

// GET /api/require-auth
const { requireAuth } = require('../../utils/auth.js');
router.get('/require-auth',requireAuth, (req, res) => {
    return res.json(req.user);
    }
);
