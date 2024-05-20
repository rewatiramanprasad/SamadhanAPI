const { createClient } = require("@supabase/supabase-js");
// const config = require("../config/config.json"); //comment this while push to deployment
const { Client } = require("pg");
const connectionString =
  "postgres://postgres.kaajgksvthactygyupbx:Wm3Ohw95H2EFKcpV@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres" ||
  process.env.dbstring;
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthYWpna3N2dGhhY3R5Z3l1cGJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2Mjk2MDAsImV4cCI6MjAzMTIwNTYwMH0.i5JFfHIK4lswz1m56wsW0bG9pN6XEYH7aCJ6s0kqWU4"
// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.supabseurl||"https://kaajgksvthactygyupbx.supabase.co", process.env.supabsekey||supabaseKey);

const connection = async () => {
  return await new Client({ connectionString });
};

const query = async (str) => {
  try {
    const con = connection();
    con.connect();
    let result = await con.query(`${str}`);
    await con.end();
    return result.rows;
  } catch (error) {
    console.log(error);
  }
};

const queryWithParameter = async (str,arr) => {
    try {
      const con = connection();
      con.connect();
      let result = await con.query(`${str}`,arr);
      await con.end();
      return result.rows;
    } catch (error) {
      console.log(error);
    }
  };

module.exports = { supabase };
