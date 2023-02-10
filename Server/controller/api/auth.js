const router = require('express').Router();
const User = require('../../models/Users.js');


router.post('/Login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email
            },

        })

        if (!dbUserData) {
            res
                .status(400)
                .json({message: 'Incorrect Email or Password!'});
            return;
        }
        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res
              .status(400)
              .json({ message: 'Incorrect Email or Password!' });
            return;
        }
        req.session.save(() => {
            req.session.loggedIn = true;
            console.log(req.session.cookie);
      
            res
              .status(200)
              .json({ user: dbUserData, message: 'You are now logged in!' });
          });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
    }
})





module.exports = router