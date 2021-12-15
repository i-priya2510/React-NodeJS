const Sequelize = require('sequelize');
var sequelize=require('./connection');

var user=sequelize.define('user',{
    username:{
      type: Sequelize.STRING,
      primaryKey:true
    },
    password:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    name:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    role:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    email:{
      type: Sequelize.TEXT,
      allowNull:false
    }
},{
      //don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false
}

  );

  



user.sync({force: false}).then(() => {
    
    console.log("User table Synched!!!");
  });


var employees=sequelize.define('employees',{
    employee_id:{
      type: Sequelize.STRING,
      primaryKey:true
    },
    password:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    name:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    role:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    email:{
      type: Sequelize.TEXT,
      allowNull:false
    }
  },
  {
        //don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
  
    // If don't want createdAt
    createdAt: false,
  
    // If don't want updatedAt
    updatedAt: false
  }
  
    );
  employees.sync({force: false}).then(() => {
    
      console.log("Employees table Synched!!!");
    });

 var softlocks=sequelize.define('softlocks',{

      employee_id:{
        type: Sequelize.NUMBER,
        primaryKey:true
      },
      manager:{
        type: Sequelize.TEXT,
        allowNull:false
      },
      status:{
        type: Sequelize.TEXT,
        allowNull:false
      },  
      reqdate:{
        type: Sequelize.TEXT,
        allowNull:false
      },
      requestmessage:{
        type: Sequelize.TEXT,
        allowNull:false
      },
      wfm_manager:{
        type: Sequelize.TEXT,
        allowNull:false
      }
    },
    {
          //don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
      // If don't want createdAt
      createdAt: false,
      // If don't want updatedAt
      updatedAt: false
    }
      );
    
  
  module.exports={user:user};