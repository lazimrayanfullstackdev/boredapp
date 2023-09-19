import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import ejs from "ejs";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);
  const type = req.body.type;
  const participants= req.body.participants;
  const url = "https://bored-api.appbrewery.com/filter?type="+type+"&participants="+participants;
  console.log(url);
  try {
    const filterResponse = await axios.get("https://bored-api.appbrewery.com/filter?type="+type+"&participants="+participants);
    const filterResult = filterResponse.data;
    res.render("solution.ejs", {
      data: filterResult[Math.floor(Math.random() * filterResult.length)],
    });
  } catch (error) {
    console.log("Failed to make request",error.message);
    res.render("index",{
      error: "No Activity Found for this criteria"
    })  
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
