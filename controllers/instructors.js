const fs = require('fs');
const data = require('../data.json');
const {age,date} = require("../utils");

exports.index = function(req,res){
  return res.render('instructors/index', {instructors: data.instructors});
}

exports.create = function(req,res){
  return res.render('instructors/create');
}

exports.show = function(req,res){ 
  const {id} = req.params;
  
  const {instructors} = data;

  const foundInstructor = instructors.find(function(instructor){
      return instructor.id == id;
  });

  if(!foundInstructor){
    return res.send("instructor not found");
  }
  const services = foundInstructor.services.split(",");
  const created_at = Intl.DateTimeFormat("pt-Br").format(foundInstructor.created_at);
  const birth = age(foundInstructor.birth);

  const instructor = {
    ...foundInstructor,
    birth,
    services,
    created_at
  }

  return res.render("instructors/show", {instructor});

}

exports.post = function(req,res){
  const dados = req.body;

  const keys = Object.keys(dados);

  for (key of keys) {
    if (dados[key] === "") {
      return res.send("please, fill all fields");      
    }
  }
  let {avatar_url, name,birth,gender,services} = dados;

  birth = Date.parse(dados.birth);
  const created_at = Date.now();
  const id = Number(data.instructors.length + 1);

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at
  });
  fs.writeFile('data.json',JSON.stringify(data,null,2), function(error){
    if(error) return res.send('write file error!');
   
  });
  return  res.redirect("/instructors");
}

exports.edit = function(req,res){
  const {id} = req.params;
  
  const {instructors} = data;

  const foundInstructor = instructors.find(function(instructor){
      return instructor.id == id;
  });

  if(!foundInstructor){
    return res.send("instructor not found");
  }
  
  const birth = date(foundInstructor.birth).iso;
  const instructor = {
    ...foundInstructor,
    birth
  }
  return res.render('instructors/edit', {instructor});
}

exports.put = function (req,res) {
  const {id} = req.body;

  let index = 0;

  const foundInstructor = data.instructors.find(function(instructor,foundIndex){
    console.log(id);
    if(instructor.id ==id){
      index = foundIndex;
      return true;
    }
  });

  if(!foundInstructor) return res.send('Instructor not found');

  const instructorUpdate = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.instructors[index] = instructorUpdate;

  fs.writeFile('data.json',JSON.stringify(data,null,2), function(error){
    if(error) return res.send('write file error!');
   
  });

  return  res.redirect(`/instructors/${id}`);
}

exports.delete = function(req,res){
  const {id} = req.body;

  const filteredInstructors = data.instructors.filter(function(instructor){
      return instructor.id !=id;
  });

  data.instructors = filteredInstructors;

  fs.writeFile('data.json',JSON.stringify(data,null,2), function(error){
    if(error) return res.send('write file error!');
   
  });
  
  return res.redirect("/instructors");
}