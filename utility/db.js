const { createClient } = require("@supabase/supabase-js");
// const config = require("../config/config.json");
const { Client } = require("pg");
const connectionString =
  "postgres://postgres.kaajgksvthactygyupbx:Wm3Ohw95H2EFKcpV@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres" ||
  process.env.dbstring;

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.supabseurl, process.env.supabsekey);

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
