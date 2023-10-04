
const userController = require('../controllers/user.controller')
const upload = require('../config/multer.config');



module.exports = app => {
    // app.post('/api/register', userController.registerOld),
    app.post('/api/register', userController.register),
    app.post('/api/login', userController.login),
    app.post('/api/logout', userController.logout),
    app.get('/api/loggedUser', userController.getLoggedUser)
    // app.put('/api/addPic/:id', upload.single('images'), userController.updateProfilePicture); // not working!!
    app.post('/api/upload',upload.single('file'), userController.addPicture)

    //ROute for ALL users !
    app.get('/api/users', userController.getAllUsers)

}