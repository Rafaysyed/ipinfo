import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import axios from "axios";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));


const API_URL = "https://api.ipify.org/?format=json";
const API_URL2 = "https://ipinfo.io/";

const result = await axios.get(API_URL);

app.get("/", async(req, res) => {
  res.render('index.ejs', { ip: result.data.ip });
  
  const ip = result.data.ip;
});

app.post("/submit", async(req, res) => {
   try {
    const result = await axios.get(API_URL);
    const ip = result.data.ip;
    const resultApi2 = await axios.get(`${API_URL2}${ip}/geo`);
    
    res.render("index.ejs", {
      city: resultApi2.data.city,
      country: resultApi2.data.country,
      hostname: resultApi2.data.hostname,
      ip: resultApi2.data.ip,
      loc: resultApi2.data.loc,
      org: resultApi2.data.org,
      postal: resultApi2.data.postal,
      region: resultApi2.data.region,
      timezone: resultApi2.data.timezone,
    });
  } catch (error) {
    res.render("index.ejs", { secret: JSON.stringify(error.response.data) });
  }
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
