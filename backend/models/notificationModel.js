import mongoose from 'mongoose'


const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['follow', 'comment', 'like'],
    },
    content: {
        type: String,
        required: true,
    },
    resource: [
        {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'type',
        },
    ],
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
       
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    readAt: {
        type: Date,
        default: null,
    },
})
const Notification=mongoose.model('Notification', notificationSchema)
export default Notification