const db = require("../config/db");

exports.addWeight = async (req,res)=>{

  try{

    const {animal_id,current_weight,user_id} = req.body;

    await db.query(`
      INSERT INTO weight_logs
      (animal_id,user_id,current_weight)
      VALUES(?,?,?)
    `,[animal_id,user_id,current_weight]);

    res.json({message:"Weight recorded"});

  }catch(error){

    res.status(500).json({message:"Error recording weight"});

  }

};