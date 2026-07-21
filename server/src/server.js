const express = require('express')

const app = express()

app.get("/users", (req, res) =>{
    res.json({message: "user names"});
});


const PORT = 3000;
app.listen(PORT, () =>{

    console.log(`Server running on PORT ${PORT}`);
});
// http://localhost:3000/users