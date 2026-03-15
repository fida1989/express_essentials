import express, { request, response } from "express";
import data from "./data/mock.json" with { type: 'json' };;

const app = express();

const PORT = 3000;

app.use(express.static("public"));

app.use("/images", express.static("images"));

app.use(express.json());

app.get("/", (request, response) => {
    response.json(data);
});

app.post("/item", (request, response) => {
    console.log(request.body);
    response.send(request.body);
});

app.get("/download", (request, response) => {
    response.download("images/photo.jpeg");
});

app.get("/redirect", (request, response) => {
    response.redirect("https://www.google.com");
});

app.get("/error", (request, response) => {
    throw new Error();
});

app.route("/class").get((request, response) => {
    response.send("route chain get");
}).post((request, response) => {
    response.send("route chain post");
}).put((request, response) => {
    response.send("route chain put");
}).delete((request, response) => {
    response.send("route chain delete");
});


app.get("/next", (request, response, next) => {
    console.log("response will be sent later!");
    next();
},(request, response) => {
    response.send("i set up a route with calback");
});

app.get("/class/:id", (request, response) => {
    const studentId = Number(request.params.id);
    const student = data.filter((student) => student.id == studentId);
    response.send(student);
});

app.post("/create", (request, response) => {
    response.send("This is a CREATE request.");
});

app.put("/edit", (request, response) => {
    response.send("This is a EDIT request.");
});

app.delete("/delete", (request, response) => {
    response.send("This is a DELETE request.");
});

app.use((err, req, res, mext)=> {
    console.error(err.stack);
    res.status(500).send("Somethin went wrong!");
});

app.listen(PORT, ()=> {
    console.log(`The server is running on port number ${PORT}`);
});