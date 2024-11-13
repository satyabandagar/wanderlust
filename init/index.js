const mongoose = require("mongoose");
const initData = require ("./data.js");
const Listing = require("../models/listing.js");


main().then(()=>{ 
    console.log("connected mongoDb ");
}).catch(err=>{
    console.log("error connecting mongoDb");
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

  }

  const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj) => ({...obj,owner:"'672af2db1a87344f1cdf6382'"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
  }

  initDB(); 
