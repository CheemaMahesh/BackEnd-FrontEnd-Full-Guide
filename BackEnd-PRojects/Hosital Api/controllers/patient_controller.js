const Doctor=require('../model/doctor');
const Patient=require('../model/patient');
const Patients_Reports=require('../model/patient_report');


//to create a patient
module.exports.registerPatient=async function(req,res){
    try{
let isPatient=await Patient.findOne({phone:req.body.phone});
let doctor=await Doctor.findById(req.body.doctor);

     if(!isPatient){
         let patient=await Patient.create({
                        
                        phone:req.body.phone,
                        doctor:req.body.doctor
                    });
                    doctor.patient.push(patient);
                    doctor.save();
                    return res.status(200).json({
                        message:"Patient created Successfuly",
                        patientInfo:patient
                    })

                }else{
                        return res.status(200).json({
                            message:"Patient already exists",
                            Patient:isPatient
                        })
                    }
    }catch(err){
        if(err){
            console.log(err);
            return res.status(500).json({
                message:"Can not create Patient"
            })
        }
    }
}



module.exports.createReport=async function(req,res){
    try{
    const patient=await Patient.findById(req.body.id);

    if(patient){
        const report=await Patients_Reports.create({
            name:req.body.name,
            Patient:req.body.id,
            status:req.body.status,
            date:req.body.date
        })
        patient.reports.push(report);
        patient.save();
        console.log(report);
        return res.status(200).json({
            message:"Report has been created ",
            report:report
        })
    }

    }catch(err){
        if(err){
            console.log(err);
            return res.status(500).json({
                message:"Can not create Patient Report"
            })
        }
    }
}



module.exports.allReports = async function(req, res) {
    try {
      const patient = await Patient.findById(req.params.id)
      .populate({
        path: 'doctor',
        select: 'name -_id'
      })
      .populate({
        path: 'reports',
        select: {
          data: 1,
          name: 1,
          status: 1,
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          _id: 0
        }
      })
     
        .exec();
  
      return res.status(200).json({
        Reports: patient
      });
    } catch (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Can not render patient report"
        });
      }
    }
  }


  module.exports.allStatus=async (req,res)=>{
    try{
        const reports=await Patients_Reports.find({status:req.params.status});
        console.log(reports);
        if(reports){
            return res.status(200).json({
                message:"here is your reports",
                reports:reports
            });
        }

    }catch(err){
        if (err) {
            console.log(err);
            return res.status(500).json({
              message: "Can not render patient report"
            });
          }
    }
  }
  
  