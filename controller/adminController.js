const admin = require('../model/AdminModel')
const movies = require('../model/MovieModel')
const banner = require('../model/BannerModel')
const screen = require('../model/ScheduleModel')
const {generateToken} = require('../jwtverify')


const adminLogin = async (req,res)=>{
    try{
        const adminLoginData = admin.findOne({email:req.body.email})
        console.log(adminLoginData)
        if(!adminLoginData){
            return res.status(401).json({message:'Admin credentials is not matched'})
        }else{
        const Token = generateToken(adminLoginData._id)
        console.log("admintoken",Token)
        return res.status(200).json({token:Token,id:adminLoginData._id,role:'admin',message:"admin login successfull"})
        }

    }catch(err){
        return res.status(500).json(err.message)

    }
    
}

const postMovies = async(req,res)=>{
    try{
        
        const postedMovies = await movies.create(req.body)
          console.log(postedMovies)
        return res.status(200).json({message:'movie added successfully'})


    }catch(err){
        return res.status(500).json(err.message)
    }
}
const postBanner = async(req,res)=>{
    try{

        const postedBanner = await banner.create(req.body)
        return res.status(200).json({message:'upload banner successfully'})

    }catch(err){
        return res.status(500).json(err.message)
    }
}


const getBanner = async(req,res)=>{
    
    try{
        const getBannerDetails = await banner.find()
        return res.status(200).json(getBannerDetails)

    }catch(err){
        return res.status(500).json(err.message)
    }
}

const getMovies = async(req,res)=>{
    try{
        const getMovieDetails = await movies.find({status:'running'})
        return res.status(200).json(getMovieDetails)

    }catch(err){
        return res.status(500).json(err.message)
    }
}


const getAllMovies = async(req,res)=>{
    try{
        const getAllMovieDetails = await movies.find()
        return res.status(200).json(getAllMovieDetails)

    }catch(err){
        return res.status(500).json(err.message)
    }
}

const updatedMovies = async(req,res)=>{
    try{
        const updatedDetails = await movies.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        console.log("updatedddddddddddd",updatedDetails)
        return res.status(200).json({update:updatedDetails, message:'updated successfully'})

    }catch(err){
        return res.status(500).json(err.message)
    }
}

const deleteMovie = async(req,res)=>{
    try{
        const deletedDetails = await movies.findByIdAndDelete(req.params.id)
        return res.status(200).json({message:"movie deleted"})

    }catch(err){
        return res.status(500).json(err.message)

    }
}

// const addScreenData = async (req,res)=>{
//     try{
//         const {movieName,movieId,showTime,showDate} = req.body
//         console.log("kittiyooooooooooooooo",showTime)
//         // const screenData = await screen.create({ movieId, showTime, showDate,movieName });

//         const Screen = await screen.findOne(movieId);
//         console.log("88888888888888",Screen)
//         if(!Screen){
//             return
//         }

//         Screen.movieSchedules.push({
//             movieId,
//             showTime,
//             notAvailableSeats:[],
//             showDate
//         });
//         await Screen.save()
//         return res.status(200).json("added successfully")


//     }catch(err){
//         return res.status(500).json(err.message)
//     }
// }

// const addSchedule = async (req,res)=>{
//     try{
//         const movie = await movies.findById(movieId)
        

//     }catch(err){
//         return res.status(500).json(err.message)
//     }
// }







const addScreenData = async (req, res) => {
    try {
        const { movieName, movieId, showsDate, seats, showTime, showDate } = req.body;

        // Parse and format the showDate
        const inputDate = showDate;
        const parsedDate = new Date(inputDate);
        const formattedDate = new Date(
            Date.UTC(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate())
        ).toISOString();

        console.log("Formatted Show Date:", formattedDate);

        // Check if the movie schedule already exists
        let Screen = await screen.findOne({ movieId, showsDate: formattedDate });

        if (!Screen) {
            // Create a new screen document if none exists
            Screen = new screen({
                movieName,
                movieId,
                showsDate: formattedDate,
                seats, // Initialize seats if required
                movieSchedules: [], // Initialize movieSchedules array
            });
        }

        // Check if the same showTime and showDate already exist in movieSchedules
        const existingSchedule = Screen.movieSchedules.find(
            (schedule) =>
                schedule.showTime === showTime &&
                new Date(schedule.showDate).toISOString() === formattedDate
        );

        if (existingSchedule) {
            return res
                .status(400)
                .json({ message: "Schedule with the same time and date already exists" });
        }

        // Add new schedule to the movieSchedules array
        Screen.movieSchedules.push({
            movieId,
            showTime,
            showDate: formattedDate,
            notAvailableSeats: [], // Initialize with an empty array
        });

        // Save the updated/new document
        await Screen.save();

        return res.status(200).json({ message: "Schedule added successfully", Screen });
    } catch (err) {
        console.error("Error adding schedule:", err.message);
        return res.status(500).json({ error: err.message });
    }
};


module.exports = {adminLogin,postMovies,postBanner,getBanner,getMovies,updatedMovies,getAllMovies,deleteMovie,addScreenData}