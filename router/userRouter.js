const router = require('express').Router()
const {userRegister, userLogin,getsingleMovieData, getSingleUser, updateUser, getComingsoonMovies, getScheduledMovies,getFilteredScheduledMovies, bookTickets, userBooking, sendMailDatas, BookingsAdmin} = require('../controller/userController')
const { verifyUserToken } = require('../jwtverify')

router.post('/register',userRegister)
router.post('/login',userLogin)
router.get('/getsinglemovie/:id',getsingleMovieData)
router.get('/getsingleuser/:id',verifyUserToken,getSingleUser)
router.put('/update/:id',verifyUserToken,updateUser)
router.get('/comingmovie',getComingsoonMovies)
router.get('/schedule/:id/:date',getScheduledMovies)
router.get('/filterschedule/:id/:date',getFilteredScheduledMovies)
router.post('/booktickets', bookTickets)
router.get('/userbooking',userBooking)
router.get('/bookings',BookingsAdmin)
router.get('/sendmail/',sendMailDatas)

module.exports = router