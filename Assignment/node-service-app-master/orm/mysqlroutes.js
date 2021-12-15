const model=require('../orm/model')
const route=require("express").Router();
var sequelize=require('./connection');
const employees=model.employees;
const softlocks=model.softlocks;

route.get("/emp",async function(request,response){
    try{
      sequelize.query('select e.employee_id as EmployeeID,e.name as Name,group_concat(s.name) as Skills,e.lockstatus as Status,e.experience as Experince, e.manager as Manager from employee e join skillmap sk on e.employee_id=sk.employee_id join skills s on sk.skillid=s.skillid where e.lockstatus="not_requested" group by e.employee_id',
      {model:employees ,mapToModel:true,type: sequelize.QueryTypes.SELECT}
      ).then(function(employees){
        response.json(employees)
    
    })
    }
    catch(e){
      console.log(e)
      response.status(500)
    }
  })


route.get("/softlocktabel",async function(request,response){
    try{
      sequelize.query("select s.employee_id as EmployeeID, s.manager as Requestee,s.reqdate as RequestDate,s.requestmessage as RequestMessage,e.wfm_manager WFMManager from softlock s join employee e on s.employee_id=e.employee_id where e.lockstatus='request_waiting' and s.status='waiting';",
      {model:softlocks ,mapToModel:true,type: sequelize.QueryTypes.SELECT}
      ).then(function(softlocks){
        response.json(softlocks)
    })
    }
    catch(e){
      console.log(e)
      response.status(500)
    }
  })

route.put("/updateEmployee",async function(request,response){
    try{
        let employeeid = request.body.employeeid;
        let lockstatus=request.body.status;
        await sequelize.query("update employee set lockstatus = :lockstatus where employee_id = :employeeid",
        {replacements: {employeeid: employeeid,lockstatus:lockstatus}, model:employees,mapToModel: true,type:sequelize.QueryTypes.UPDATE}
        ).then(function(){
            response.status(200).json()
        })
    }
    catch(e){
        console.log(e)
        response.status(500);
    }
})

route.post("/insertsoftlock",async function(request,response){
  try{
      let employeeid = request.body.employeeid;
      let manager = request.body.manager;
      let responsemessage = request.body.responsemessage;
      await sequelize.query("insert into softlock (employee_id,manager,reqdate,lastupdated,status,requestmessage) values(?,?,CurDate(),CurDate(),'waiting',?)",
      {replacements: [employeeid,manager,responsemessage],model:softlocks,mapToModel: true,type:sequelize.QueryTypes.INSERT}
      ).then(function(){
          response.status(200).send("record inserted");
      })
  }
  catch(e){
      console.log(e)
      response.status(500);
  }
})


route.put("/updateSoftlock",async function(request,response){
  try{
      let employeeid = request.body.employeeid;
      let status=request.body.status;
      await sequelize.query("update softlock set status=:status ,lastupdated =CURDATE() where employee_id = :employeeid",
      {replacements: {employeeid: employeeid,status:status}, model:employees,mapToModel: true,type:sequelize.QueryTypes.UPDATE}
      ).then(function(){
          response.status(200).json()
      })
      if(status=="Approved")
      {
        await sequelize.query("update employee set lockstatus = 'locked' where employee_id = :employeeid",
        {replacements: {employeeid: employeeid}, model:employees,mapToModel: true,type:sequelize.QueryTypes.UPDATE}
        ).then(function(){
            response.status(200).json()
        })
      }
      else
      {
        await sequelize.query("update employee set lockstatus = 'not_requested' where employee_id = :employeeid",
        {replacements: {employeeid: employeeid}, model:employees,mapToModel: true,type:sequelize.QueryTypes.UPDATE}
        ).then(function(){
            response.status(200).json()
        })
      }
  }
  catch(e){
      console.log(e)
      response.status(500);
  }
})


// route.get("/departments",function(request,response){
//     model.department.findAll(
//         {include:[model.employee]}
//       ).then(function(data){
//           response.json(data);
//       }).catch(function(err){
//           response.render([]);
//       })
// })



// route.post("/departments",function(request,response){
// var dept={department_id:request.body.department_id,
//           name:request.body.name,
//           employees:request.body.employees}
//           console.log(dept);
//     model.department.create(dept,{include: [model.employee]}).then(
//         ()=>response.send("successfully uploaded")
//     ).catch(
//         ()=>response.sendStatus(500)
//     );
// })


module.exports=route;