const Animal = require("../models/animalModel");

exports.getAnimals = async (req,res)=>{

  try{

    const animals = await Animal.findAll();

    res.json(animals);

  }catch(error){

    res.status(500).json({message:"Error getting animals"})

  }

};

exports.getAnimalById = async (req,res)=>{

  try{

    const id = req.params.id;

    const animal = await Animal.findById(id);

    res.json(animal);

  }catch(error){

    res.status(500).json({message:"Error getting animal"})

  }

};

exports.createAnimal = async (req,res)=>{

  try{

    const data = req.body;

    await Animal.create(data);

    res.json({message:"Animal created"});

  }catch(error){

    res.status(500).json({message:"Error creating animal"})

  }

};

exports.updateAnimal = async (req,res)=>{

  try{

    const id = req.params.id;

    await Animal.update(id,req.body);

    res.json({message:"Animal updated"});

  }catch(error){

    res.status(500).json({message:"Error updating animal"})

  }

};

exports.deleteAnimal = async (req,res)=>{

  try{

    const id = req.params.id;

    await Animal.delete(id);

    res.json({message:"Animal deleted"});

  }catch(error){

    res.status(500).json({message:"Error deleting animal"})

  }

};

exports.getAnimalHistory = async (req,res)=>{

  try{

    const id = req.params.id;

    const history = await Animal.getHistory(id);

    res.json(history);

  }catch(error){

    res.status(500).json({message:"Error getting history"})

  }

};