var express=require("express");
var fileuploader=require("express-fileupload");
var cloudinary=require("cloudinary").v2;
var mysql2=require("mysql2");
var app=express();//app() returns an Object:app

 //AI Started
 const { GoogleGenerativeAI } = require("@google/generative-ai");

 const genAI = new GoogleGenerativeAI("AIzaSyBp7hOLWDBo5-0G_-fYwkuuDnEffGhJO8s"); const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.use(fileuploader());//for receiving files from client and save on server files

   //AI Connection start

     




//Ai connection finished

app.listen(2007,function(){
    console.log("Server Started at Port no: 2007")
})
app.use(express.static("public"));//pic khud dund lega
app.get("/",function(req,resp)
{
    console.log(__dirname);
    console.log(__filename);

    let path=__dirname+"/public/index.html";
    resp.sendFile(path);
})

 app.get("/org-details", (req, resp) => {
     resp.sendFile(__dirname + "/public/org-details.html");
 });
 
 
 app.get("/player-details", (req, resp) => {
     resp.sendFile(__dirname + "/public/player-details.html");
 });

 
 app.get("/user-admin-details", (req, resp) => {
     resp.sendFile(__dirname + "/public/user-admin-details.html");
 });

 app.get("/dash-org", (req, resp) => {
     resp.sendFile(__dirname + "/public/dash-organizers.html");
 });

  app.get("/post-tournaments", (req, resp) => {
     resp.sendFile(__dirname + "/public/post-tournaments.html");
 });
 app.get("/tournaments-Manage", (req, resp) => {
     resp.sendFile(__dirname + "/public/tournaments-manage.html");
 });
app.get("/profile-player", (req, resp) => {
     resp.sendFile(__dirname + "/public/profile-player.html");
 });

   app.get("/tournaments-details", (req, resp) => {
     resp.sendFile(__dirname + "/public/tournament-finder.html");
 });

  

 app.get("/admin-user-console", (req, resp) => {
     resp.sendFile(__dirname + "/public/admin-user-console.html");

    
 });

       app.get("/player-admin-console", (req, resp) => {
     resp.sendFile(__dirname + "/public/player-admin-console.html");
 });

              
       app.get("/organizers-admin-console", (req, resp) => {
     resp.sendFile(__dirname + "/public/organizers-admin-console.html");
 });


  
app.use(express.urlencoded(true)); //convert POST data to JSON object

 cloudinary.config({ 
            cloud_name: 'dsp6m03a7', 
            api_key: '586641989386549', 
            api_secret: 'TxGgGjW8T6tJHWM_GsVe5ifjlW4' // Click 'View API Keys' above to copy your API secret
        });
//--------------------------------AIven started---------------------------
    let dbConfig="mysql://avnadmin:AVNS_RhbI6l9LResKSVTbiHw@mysql-1803dd83-goyaljanvi77196-dd71.e.aivencloud.com:12802/defaultdb?";

    let mySqlVen=mysql2.createConnection(dbConfig);
    mySqlVen.connect(function(errKuch)
    {
        if(errKuch==null)
                console.log("AiVen Connected Successfulllyyy!!!!");
        else
                console.log(errKuch.message)
    })






// //for style and script files
 app.use(express.static("public"));
 app.use(express.urlencoded(true)); //convert POST data to JSON object


 cloudinary.config({
     cloud_name: 'dfyxjh3ff',
    api_key: '261964541512685',
    api_secret: 'PfRVIo1IagO5z_ZnNFI1TQ7DOLc' // Click 'View API Keys' above to copy your API secret
});




// //--------------------------------------------------------
          //tournaments find quaries
 app.get("/do-fetch-all-tournaments",function(req,resp)
{
  console.log(req.query)
        mySqlVen.query("select * from tournaments where city=? and sports=?",[req.query.kuchCity,req.query.kuchGame],function(err,allRecords)
        {
          console.log(allRecords)
                    resp.send(allRecords);
        })
})
 app.get("/do-fetch-all-cities",function(req,resp)
{
        mySqlVen.query("select distinct city from tournaments",function(err,allRecords)
        {
                    resp.send(allRecords);
        })
})

                //finish  distinct for select one city from multiple


     app.get("/fetch-all-sports",function(req,resp)

       {
        mySqlVen.query("select distinct sports from tournaments",function(err,allRecords)
        {
                    resp.send(allRecords);
        })
})

         //finish to search anything like myntra




    //SERVER SIGNUP  FOR SEND DATA TO SERVER with ajax 
    
      app.get("/signup-one",function(req,resp)
      {
           let email = req.query.txtEmail;
    let pwd = req.query.txtPwd;
    let userType = req.query.userType;


        mySqlVen.query("insert into users values (?,?,?,1,current_date())",[email,pwd,userType],
            function(errKuch) 
        {
          if (errKuch==null)
                 resp.send("SignUp Successfull");
                else 
                    resp.send(errKuch.message)   
        }
      )

})

             //SERVER SIGNUP  FOR Login
    
   app.get("/do-login",function(req,resp)
{
    
        mySqlVen.query("select * from users where emailid=? and pwd=? ",[req.query.txtEmail2,req.query.txtPwd2],function(err,allRecords)
        {
            
            if(allRecords.length==0)
            {
                     resp.send("Invalid ")

            }
               else if(allRecords[0].status==1)
               {
                resp.send(allRecords[0].userstype);
               }
         
            else
                resp.send("Blocked..");
        });
        })    

         //SERVER SIGNUP  FOR SEND organization  DATA TO SERVER 
    

     app.post("/server-signup-safe",async function(req,resp)
      {
   let pic = "";
if (req.files != null) {
    let fName = req.files.profilePic.name;
    let fullPath = __dirname + "/public/uploads/" + fName;
    req.files.profilePic.mv(fullPath);

    await cloudinary.uploader.upload(fullPath).then(function (picUrlResult) {
        pic = picUrlResult.url; // ✅ assign to pic
        console.log(pic);
    });
} else {
    pic = "nopic.jpg";
}


           let emailid = req.body.txtEmaildas;
   
            let orgname = req.body.txtOrg;
            let regnumber = req.body.txtNum;
            let adress=req.body.txtAdress;
            let  city=req.body.txtCity;
            let sports=req.body.txtDeals;
            let website=req.body.txtWeb;
            let insta=req.body.txtInsta;
            let head=req.body.txtHead;
            let contact=req.body.txtCont;
           
  
 mySqlVen.query(
    "insert into organizers values (?,?,?,?,?,?,?,?,?,?,?)",
    [
      emailid,orgname,regnumber,adress,city,sports,website,insta,head,contact,pic
    ],
        
            function(errKuch) 
        {
          if (errKuch==null)
                 resp.send("Record Saved Successfulllyyy....Badhai");
                else 
                    resp.send(errKuch.message)   
        }
      )

})

app.post("/update-user",async function(req,resp)
{
   let pic="";
    if(req.files!=null) //user wants to Update Profile Pic
    {
        let fName=req.files.profilePic.name;
        let fullPath=__dirname+"/public/uploads/"+fName;
        req.files.profilePic.mv(fullPath);

        await cloudinary.uploader.upload(fullPath).then(function(picUrlResult)
        {
            pic=picUrlResult.url;   //will give u the url of ur pic on cloudinary server

            console.log(pic);
      });
    }
    else
        pic=req.body.hdn;
        
        let emailid = req.body.txtEmaildas;
   
            let orgname = req.body.txtOrg;
            let regnumber = req.body.txtNum;
            let adress=req.body.txtAdress;
            let  city=req.body.txtCity;
            let sports=req.body.txtDeals;
            let website=req.body.txtWeb;
            let insta=req.body.txtInsta;
            let head=req.body.txtHead;
            let contact=req.body.txtCont;

        mySqlVen.query("update organizers set orgname=?,regnumber=?,adress=?,city=?,sports=?,website=?,insta=?,head=?,contact=?,pic=? where emailid=?",[orgname,regnumber,adress,city,sports,website,insta,head,contact,pic,emailid],function(errKuch,result)
        {
                if(errKuch==null)
                {
                    if(result.affectedRows==1)
                        resp.send("Record Updated Successfulllyyy....Badhai");
                    else
                        resp.send("Inavlid email Id");
                }
                else 
                    resp.send(errKuch.message)   
        })

})

            //   for input record base on email

app.get("/get-one",function(req,resp)
{
        mySqlVen.query("select * from organizers where emailid=?",[req.query.txtEmaildas],function(err,allRecords)
        {
            if(allRecords.length==0)
                resp.send("No Record Found");
            else
                resp.json(allRecords);
        })
})

                // Events data send with ajax

  app.get("/events-one",function(req,resp)
      {
           let email = req.query.txtE;
    let events = req.query.txtEvent;
    let eventdate = req.query.txtD;
    let eventime=req.query.txtTime;
    let location=req.query.txtL;
    let city=req.query.txtCity;
    let sports=req.query.txtSports;
     let minage=req.query.txtMin;
    let maxage=req.query.txtMax;
     let lastdate=req.query.txtLast;
    let fees=req.query.txtFees;
    let prize=req.query.txtPrize;
    let contactno=req.query.txtCont;
      

        mySqlVen.query("insert into tournaments values (?,?,?,?,?,?,?,?,?,?,?,?,?,? )",[null,email,events,eventdate,eventime,location,city,sports,minage,maxage,
            lastdate,fees,prize,contactno
        ],
            function(errKuch) 
        {
          if (errKuch==null)
                 resp.send("Record Saved Successfulllyyy....Badhai");
                else 
                    resp.send(errKuch.message)   
        }
      )

})


//Angular data Fetch

 app.get("/angularemailget-one",function(req,resp)
{
        mySqlVen.query("select * from tournaments where email=?",[req.query.txtE],function(err,allRecords)
        {
            if(allRecords.length==0)
                resp.send("No Record Found");
            else
                resp.json(allRecords);
        })
})


app.get("/do-fetch-all-users",function(req,resp)
{
      
 
        mySqlVen.query("select * from tournaments",function(err,allRecords)
        {
                    resp.send(allRecords);
        })
})
    
    
 app.get("/delete-one",function(req,resp)
  {
    // console.log(req.query)
    let rid=req.query.rid;
  

   mySqlVen.query("delete from tournaments where rid=?",[rid],function(errKuch,result)
   {
         if(errKuch==null)
                            {
                     if(result.affectedRows==1)
                         resp.send(rid+" Deleted Successfulllyyyy...");
                     else
                         resp.send("Invalid Email id");
                }
               else
               resp.send(errKuch);
    })
 }) 


 app.get("/search-one",function(req,resp)
{
    console.log(req.query.txtEmail);
        mySqlVen.query("select * from players where emailid=?",[req.query.txtEmail5],function(err,allRecords)
        {
            if(allRecords.length==0)
                resp.send("No Record Found");
            else
                resp.json(allRecords);
        })
    })
// ------------------------------Insert-player data-------------------------------------------------------


 async function RajeshBansalKaChirag(imgurl)
 {
 const myprompt = "Read the text on picture and tell all the information in adhaar card and give output STRICTLY in JSON format {adhaar_number:'', name:'', gender:'', dob: ''}. Dont give output as string."   
     const imageResp = await fetch(imgurl)
         .then((response) => response.arrayBuffer());

     const result = await model.generateContent([
         {
            inlineData: {
                data: Buffer.from(imageResp).toString("base64"),
                 mimeType: "image/jpeg",
             },
        },
        myprompt,
    ]);    console.log(result.response.text())
            
           const cleaned = result.response.text().replace(/```json|```/g, '').trim();
            const jsonData = JSON.parse(cleaned);             console.log(jsonData);
     return jsonData

 }


     app.post("/server-signup-safe-player",async function(req,resp)
      {
        try{
   let adharpic = "";
    let jsonData = {};
if (req.files != null) {
    let fName = req.files.profilePic.name;
    let fullPath = __dirname + "/public/uploads/" + fName;
    req.files.profilePic.mv(fullPath);

    await cloudinary.uploader.upload(fullPath).then(async function (picUrlResult) {
        adharpic = picUrlResult.url;
         
                
      jsonData=await RajeshBansalKaChirag( adharpic);
            
            //  resp.send(jsonData);

        console.log(adharpic);
    });
} else {
    adharpic = "nopic.jpg";
}


    // second pic data
     let pic = "";
if (req.files != null) {
    let fName = req.files.profilePic2.name;
    let fullPath = __dirname + "/public/uploads/" + fName;
    req.files.profilePic2.mv(fullPath);

    await cloudinary.uploader.upload(fullPath).then(function (picUrlResult) {
        pic = picUrlResult.url; // ✅ assign to pic
        console.log(pic);
    });
} else {
    pic = "nopic.jpg";
}
      
     let emailid = req.body.txtEmaildas2;
      
    //    let name = req.body.txtName;
    //    let dob = req.body.txtDob;
    // // console.log(regnumber);
    //  let gender = req.body.txtGender;
     let adress = req.body.txtAdress2;
     let contact = req.body.txtCont2;
     let game = req.body.txtGame;
     let otherinfo = req.body.txtInfo;

     mySqlVen.query("insert into players values(?,?,?,?,?,?,?,?,?,?)", [emailid,adharpic, pic, jsonData.name||null, jsonData.dob||null, jsonData.gender||null, adress, contact, game, otherinfo], function (errKuch) {
        if (errKuch == null)
            resp.send("Record saved successfully...Badhaai");
        else
            resp.send(errKuch.message);
    })
}catch{
    resp.send(errKuch)
}

      })



            //    search player data base on email

      app.get("/get-one-player",function(req,resp)
{
        mySqlVen.query("select * from players where emailid=?",[req.query.txtEmaildas2],function(err,allRecords)
        {
            if(allRecords.length==0)
                resp.send("No Record Found");
            else
                resp.json(allRecords);
        })
})


            //  update players data

app.post("/update-player",async function(req,resp)
{
  let adharpic = "";
if (req.files != null) {
    let fName = req.files.profilePic.name;
    let fullPath = __dirname + "/public/uploads/" + fName;
    req.files.profilePic.mv(fullPath);

    await cloudinary.uploader.upload(fullPath).then(function (picUrlResult) {
        adharpic = picUrlResult.url; // ✅ assign to pic
        console.log(adharpic);
    });
} else {
    
    adharpic = req.body.hide;
}


    // second pic data
     let pic = "";
if (req.files != null) {
    let fName = req.files.profilePic2.name;
    let fullPath = __dirname + "/public/uploads/" + fName;
    req.files.profilePic2.mv(fullPath);

    await cloudinary.uploader.upload(fullPath).then(function (picUrlResult) {
        pic = picUrlResult.url; // ✅ assign to pic
        console.log(pic);
    });
} else {
    
    pic = req.body.hide2;
}



      
     let emailid = req.body.txtEmaildas2;
       let name = req.body.txtName;
       let dob = req.body.txtDob;
    // console.log(regnumber);
     let gender = req.body.txtGender;
     let adress = req.body.txtAdress2;
     let contact = req.body.txtCont2;
     let game = req.body.txtGame;
     let otherinfo = req.body.txtInfo;

 mySqlVen.query(" update players set adharpic=?,pic=?,name=?,dob=?,gender=?,adress=?,contact=?,game=?,otherinfo=? where emailid=?", [ adharpic, pic, name, dob, gender, adress, contact, game, otherinfo,emailid], function (errKuch,result) {
         if (errKuch == null)
         {
             if(result.affectedRows==1)
                         resp.send("Record  Update Saved Successfulllyyy....Badhai");
                    else
                        resp.send("Inavlid email Id hai can't be updated");
         }
        else
            resp.send(errKuch.message);
    })

})
           //fetch users data with angular

           // ------------------------- Fetch All Users -------------------------
app.get("/do-fetch", function (req, resp) {
    mySqlVen.query("SELECT * FROM users", function (err, allRecords) {
        if (err)
            resp.send(err.message);
        else
            resp.send(allRecords);
    });
});

// -------------------------- Block User ----------------------------
app.get("/do-block", function (req, resp) {
    let emailid = req.query.emailid;

    mySqlVen.query("UPDATE users SET status = 0 WHERE emailid = ?", [emailid], function (err, result) {
        if (err == null) {
            if (result.affectedRows == 1)
                resp.send("Blocked..");
            else
                resp.send("Invalid Email id");
        } else {
            resp.send(err.message);
        }
    });
});

// -------------------------- Unblock User --------------------------
app.get("/do-unblock", function (req, resp) {
    let emailid = req.query.emailid;

    mySqlVen.query("UPDATE users SET status = 1 WHERE emailid = ?", [emailid], function (err, result) {
        if (err == null) {
            if (result.affectedRows == 1)
                resp.send("unBlocked..");
            else
                resp.send("Invalid Email id");
        } else {
            resp.send(err.message);
        }
    });
});
//=================================Players Admin=============================
          // ------------------------- Fetch -------------------------




app.get("/do-fetch-players", function (req, resp) {
    mySqlVen.query("SELECT * FROM players", function (err, allRecords) {
        if (err)
            resp.send(err.message);
        else
            resp.send(allRecords);
    });
});




//=================================Organizers Admin=============================
          // ------------------------- Fetch -------------------------




app.get("/do-fetch-organizers", function (req, resp) {
    mySqlVen.query("SELECT * FROM organizers", function (err, allRecords) {
        if (err)
            resp.send(err.message);
        else
            resp.send(allRecords);
    });
});




 //Update with ajax 
    
      app.get("/do-change-password",function(req,resp)
      {
           let emailid = req.query.Email;
            let pwd = req.query.PwdOld;
    let npwd = req.query.PwdNew;
      
    
 mySqlVen.query(" update users set pwd=? where emailid=? and pwd=?", [ npwd,emailid,pwd], function (errKuch,result) {
         if (errKuch == null)
         {
             if(result.affectedRows==1)
                         resp.send("Record  Update Saved Successfulllyyy....Badhai");
                    else
                        resp.send("Inavlid email Id hai can't be updated");
         }
        else
            resp.send(errKuch.message);
    })


})