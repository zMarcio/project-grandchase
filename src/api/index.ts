import run from "./db/db-connection";
import express from "express";
import character from "./routes/charecter-grandchase";

const app = express();

try {
  run();
  app.use("/character", character);
} catch (error) {
  console.error(error);
}
