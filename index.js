import  express  from "express";
import bodyParser from "body-parser";
import axios from "axios";
import ejs from "ejs";
let port = 3000;
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static('js'));
import dotenv from "dotenv";
dotenv.config();

const apikey= process.env.API_KEY;
app.get("/", (req,res)=>{
    res.render("index.ejs", {});
})

app.post("/gita", async(req,res)=>{
  let id = req.body.type; 
  // console.log(id);
const options = {
  method: 'GET',
  url: `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${id}/`,
  params: {limit: '18'},
  headers: {
    'X-RapidAPI-Key': apikey,
    'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	// console.log(response.data.slug);
  let name = JSON.stringify(response.data.slug);
  let english_summary = JSON.stringify(response.data.chapter_summary);
  let hindi_summary= JSON.stringify(response.data.chapter_summary_hindi);
    res.render("index.ejs", {name,english_summary,hindi_summary})
}   catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }

});


app.listen(port, ()=>{
    console.log(`port ${port} is ready`);
})