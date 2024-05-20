const { supabase } = require("../utility/db");
const { ValidationError } = require("../utility/errroHandler");

const signupAuthSqlController = async (email, password, next) => {
  try {
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    // console.log(error, data);
    if(error){throw error;}
    return data;
  } catch (error) {
    console.log("catch1",error.code);
    next(new ValidationError("user already exist"))
  }
};
const signupSqlController = async (reqData, uid, next) => {
  try {
    const { data, error } = await supabase
      .from("user")
      .insert([
        {
          email: reqData.email,
          uuid: uid,
          name: reqData.name,
          mobile: reqData.mobile,
          location: reqData.location,
        },
      ])
      .select();
    if (error) {
      // console.log(error);
      throw error;
    }
    if (data.length >= 1) {
      return data;
    }
  } catch (error) {
    console.log("catch2",error.code);
    next(new ValidationError("user already exist"))
  }
};


const loginAuthSqlController=(reqData)=>{


}

module.exports = { signupAuthSqlController, signupSqlController,loginAuthSqlController };
