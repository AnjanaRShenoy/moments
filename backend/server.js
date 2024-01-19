import express from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
dotenv.config()
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000
// import userRoutes from './userRoutes.js'
import router from "./routes/userRoutes.js";
import adminRoute from "./routes/adminRoutes.js"
import cors from 'cors'
import { Server } from "socket.io";
import { createServer } from "http";
import path from "path";

connectDB()
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.SOCKETF,
    }
})
app.set('io', io)
app.use(cors())

// Your socket.io configuration and event handling can go here
io.on("connection", (socket) => {
    console.log("connected to socket.io")
    let userInfo;

    socket.on("setup", async (user) => {
        console.log("User set up:", user);
        userInfo = { ...user, online: true } // Include online status
        socket.join(userInfo.id)
        console.log(userInfo.id)
        socket.emit("connected")
        // Emit online status to all clients
        // socket.emit("userStatus", { userId: userInfo.id, online: true, lastSeen: new Date()  });
        io.to(user.id).emit("userStatus", { userId: user.id, online: true, lastSeen: new Date() });
    })

    // Joining a chat by taking chat room id from frontend
    socket.on("join chat", (room) => {
        socket.join(room)
        console.log("User joined Room: " + room)
    })

    socket.on("join notification", (userid) => {
        socket.join(userid)
        console.log("User joined notification: " + userid)
    })

    socket.off("setup", () => {
        console.log("User Disconnected");
        if (userInfo) {
            socket.leave(userInfo.id);
            io.emit('userStatus', { userId: userInfo.id, online: false, lastSeen: new Date() });
            userInfo = null;  // Reset userInfo on disconnection
        }
    })

    socket.on("disconnect", async () => {
        console.log("User disconnected");
        if (userInfo) {
            await User.updateOne({ _id: userInfo.id }, { online: false, lastSeen: new Date() });
            io.to(userInfo.id).emit('userStatus', { userId: userInfo.id, online: false, lastSeen: new Date() });
            socket.leave(userInfo.id);
            userInfo = null;  // Reset userInfo on disconnection
        }
    });
})

// app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.use('/api/users', router)
app.use('/api/admin', adminRoute)

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.use(
    "/Posts",
    express.static(path.join(__dirname, "public/Posts"))
);
app.get("*", (req, res) =>
    res.sendFile(
        path.resolve(__dirname, "..", "frontend", "dist", "index.html")
    )
);


app.get('/', (req, res) =>
    res.send('server is ready')
)

app.use(notFound)
app.use(errorHandler)

const server = httpServer.listen(port, () => console.log(`server is running in ${port}`))





