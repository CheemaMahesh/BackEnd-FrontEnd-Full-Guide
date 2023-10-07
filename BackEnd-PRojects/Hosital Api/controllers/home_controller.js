const Doctor=require('../model/doctor');


module.exports.home=async function(req,res){
    try{
        let allDoctors=await Doctor.find({});
        return res.status(200).json({
            Doctors:allDoctors,
            message:"reached home"
        });

    }catch(err){
        if(err){
            return res.status(200).json({
                message:"error while rendering home"
            })
        }
    }
}