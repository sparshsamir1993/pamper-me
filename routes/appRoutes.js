module.exports = app =>{
    app.get("/", (req, res)=>{
        res.send("hello sparsh i am from approutes");
    })
}