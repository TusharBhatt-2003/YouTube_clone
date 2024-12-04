// require('dotenv').config({ path: './env '})
import dotenv from "dotenv";

// import mongoose from 'mongoose'
// import { DB_NAME } from './constants'
// import express from 'express'

import connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});

// SECOND APPROACH
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection FAILED !!!", err);
  });

// FIRST APPROACH
// const app =  express()
// ;( async () => {
//     try  {
//        await mongoose.connect(`${process.evn.MONGOSE_URI}/${DB_NAME}`)
//        app.on('error', (error) => {
//         console.log("ERROR:", error);
//         throw error
//        })
//        app.listen(process.env.PORT, () => {
//         console.log(`App is listening on ${process.env.PORT}`);

//        })
//     } catch (error) {
//        console.log("ERROR: ", error);
//        throw error
//     }
// }) ()
