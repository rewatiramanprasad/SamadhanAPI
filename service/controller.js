const { response } = require('../utility/response');
const {supabase}=require('../utility/db')
const {serviceSignupAuthSqlController,serviceSignupSqlController}= require('../service/sqlController')
const serviceLogin=async(req,res,next)=>{
try {
    const {email,password}=req.body;
    console.log(req.body)
    let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
      if(error){
        throw error;
      }
      
      res.status(200).send(response(data,true,"login successful")).end()
} catch (error) {
    console.log(error)
}
}

const serviceSignup=async(req,res,next)=>{
try {
    const {email,password,name,mobile,location,category,Experience}=req.body;
    console.log(req.body)
    const singupAuth=await serviceSignupAuthSqlController(email,password,next);
    let signupData
    if(singupAuth.user!=null){
        console.log(singupAuth.user.id)
    signupData=await serviceSignupSqlController(req.body,singupAuth.user.id)
    
    }
    if(signupData.length>=1){
        res.status(200).send(response([],true,"user created successfully")).end();
    }
    
    
    
} catch (error) {
    console.log(error)
}
}


// binwire tchnology 
const showUserProblem=async(req,res)=>{
    
    try {
        const {profession}=req.body;
        let { data: Problem, error } = await supabase
      .from('Problem')
      .select("*")
      .eq("category",profession);
        if(error) throw error;
        res.status(200).send(response(Problem, true, "")).end();
      
      } catch (error) {
        console.log(error)
      }

}

const addProposal=async(req,res)=>{

  
const { data, error } = await supabase
.from('proposal')
.insert([
  { some_column: 'someValue', other_column: 'otherValue' },
])
.select()
        
if(error){throw error}
if(data){
  res.status(200).send(response(data, true,"data inserted successfully")).end();
}

}


module.exports={serviceLogin,serviceSignup,showUserProblem}