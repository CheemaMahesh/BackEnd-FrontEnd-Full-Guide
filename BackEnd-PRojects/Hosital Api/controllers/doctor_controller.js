// Import model
const Doctor = require('../model/doctor');
const jwt=require('jsonwebtoken');


// Create a doctor
module.exports.createDoctor = async (req, res) => {
  try {
    let isDoctor=await Doctor.findOne({email:req.body.email});


      if(isDoctor){
        return res.status(409).json({
          message:"User already exists"
        })

      }else{
        if(req.body.password==req.body.cPassword){
        let doctor = await Doctor.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
    
        console.log(doctor);
        return res.status(200).json({ message: "Doctor has been created" ,doctor:doctor});
  
      }else{
        return res.status(401).json({ message: "Doctor has not been created" });
  
      }}

    
    
  } catch (err) {
    console.log("Error while creating a doctor", err);
    return res.status(500).json({
      message: "Error while creating a doctor"
    });
  }
};






// const User=require('../../../models/user');

module.exports.createSession=async function(req,res){
    try{
      let user=await Doctor.findOne({email:req.body.email});
      if(!user||user.password!=req.body.password){
        return res.status(422).json({
            message:"invalid username or password"
        })
      }
      
      return res.status(200).json({
        massage:"signin successfuly and here is your token ,keep it safe",
        data:{
            token:jwt.sign(user.toJSON(),'HospitalAPI',{expiresIn:'1000000'})
        }
      })
    
    }catch(err){
        console.log("Error in deleting a post  with api:", err);

        return res.status(500).json({
          message:'internal server Error'
        });
    }
    
       
    }
