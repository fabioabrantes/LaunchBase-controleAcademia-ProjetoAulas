const fs = require('fs');
const data = require('../data.json');
const {date,replaceBlood} = require("../utils");

exports.create = function(req,res){
  return res.render('members/create');
}

exports.index = function(req,res){
  return res.render('members/index', {members: data.members});
}

exports.post = function(req,res){
  const dados = req.body;

  const keys = Object.keys(dados);

  for (key of keys) {
    if (dados[key] === "") {
      return res.send("please, fill all fields");      
    }
  }
  
  birth = Date.parse(req.body.birth);
  
  let id = 1;
  
  const lastMember = data.members[data.members.length - 1];
  
  if(lastMember){
    id = lastMember.id + 1;
  }

  data.members.push({
    ...req.body,
    id,
    birth
  });

  fs.writeFile('data.json',JSON.stringify(data,null,2), function(error){
    if(error) return res.send('write file error!');
   
  });
  return  res.redirect("/members");
}

exports.show = function(req,res){ 
  const {id} = req.params;
  
  const {members} = data;

  const foundMember = members.find(function(member){
      return member.id == id;
  });

  if(!foundMember){
    return res.send("member not found");
  }
  
  const blood = replaceBlood(foundMember.blood);
 

  const member = {
    ...foundMember,
    blood,
    birth:date(foundMember.birth).birthDay
  }

  return res.render("members/show", {member});

}

exports.edit = function(req,res){
  const {id} = req.params;
  
  const {members} = data;

  const foundMember = members.find(function(member){
      return member.id == id;
  });

  if(!foundMember){
    return res.send("member not found");
  }

  const birth = date(foundMember.birth).iso;
 
  const member = {
    ...foundMember,
    birth
  }
  return res.render('members/edit', {member});
}

exports.put = function (req,res) {
  const {id} = req.body;

  let index = 0;

  const foundMember = data.members.find(function(member,foundIndex){
    console.log(id);
    if(member.id ==id){
      index = foundIndex;
      return true;
    }
  });

  if(!foundMember) return res.send('Member not found');

  const memberUpdate = {
    ...foundMember,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.members[index] = memberUpdate;

  fs.writeFile('data.json',JSON.stringify(data,null,2), function(error){
    if(error) return res.send('write file error!');
   
  });

  return  res.redirect(`/members/${id}`);
}

exports.delete = function(req,res){
  const {id} = req.body;

  const filteredMembers = data.members.filter(function(member){
      return member.id !=id;
  });

  data.members = filteredMembers;

  fs.writeFile('data.json',JSON.stringify(data,null,2), function(error){
    if(error) return res.send('write file error!');
   
  });
  
  return res.redirect("/members");
}