const { response } = require("../utility/response");
const { supabase } = require("../utility/db");
const {
  signupAuthSqlController,
  signupSqlController,
  loginAuthSqlController,
        } = require("./sqlController");
const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.log(error);
      throw error;
    }
    console.log(data);
    res.status(200).send(response(data, true, "login successful")).end();
  } catch (error) {
    console.log(error)
  }
};

const userSignup = async (req, res, next) => {
  try {
    const { email, password, name, mobile, location } = req.body;
    console.log(req.body);
    const singupAuth=await signupAuthSqlController(email,password,next);
    let signupData;
    if(singupAuth.user!=null){
        console.log(singupAuth.user.id)
    signupData = await signupSqlController(
      req.body,
      singupAuth.user.id
    );

    }
    if (signupData.length >= 1) {
      res
        .status(200)
        .send(response(signupData, true, "user created successfully"))
        .end();
    }
  } catch (error) {}
};

// binwire tchnology
const insertProblem = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("Problem")
      .insert([req.body])
      .select();
    if (error) {
      throw error;
    }
    if (data.length == 1) {
      res.status(200).send(response(data, true, "")).end();
    }
  } catch (error) {
    console.log(error);
  }
};
const showProblem=async(req,res)=>{
  try {
    const{email}=req.body;
    let { data: Problem, error } = await supabase
  .from('Problem')
  .select("*")
  .eq("email",email);
    if(error) throw error;
    res.status(200).send(response(Problem, true, "")).end();
  
  } catch (error) {
    console.log(error)
  }
}

module.exports = { userLogin, userSignup, insertProblem,showProblem };
