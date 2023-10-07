//importing express
const express=require('express');
const router=express.Router();

const issueController=require('../controllers/issue_controller');

router.post('/issues',issueController.generate);


//exporting router
module.exports=router;