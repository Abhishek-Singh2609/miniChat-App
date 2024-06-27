const mongoose= require("mongoose")
const chat =require("./models/chat.js")
main().then((res)=>{
    console.log("connection successful");
}).catch((err) => {console.log(err)});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}
let allchats=[
    {
        from: "neha",
        to: "priya",
        msg: "send me your exam sheets",
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        from: "alex",
        to: "mike",
        msg: "remember to bring the book tomorrow",
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        from:"neha",
        to:"priya",
        msg:"send me your exam sheets",
        created_at: new Date(),
        updated_at: new Date()
       },
       {
        from: "john",
        to: "sarah",
        msg: "meeting postponed to next week",
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        from: "emma",
        to: "chris",
        msg: "let's grab lunch at 12:30",
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        from: "david",
        to: "lisa",
        msg: "don't forget about the presentation",
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        from: "sam",
        to: "julia",
        msg: "happy birthday! 🎉",
        created_at: new Date(),
        updated_at: new Date()
    }
];
chat.insertMany(allchats);
