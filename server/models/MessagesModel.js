import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: false,
    },
    messageType:{
        type: String,
        enum: ["text", "file"],
        required: true,
    },
    content: {
        type: String,
        required: function() {
            return this.messageType === "text";
        }
    },
    fileUrl: {
        type: String,
        required: function() {
            return this.messageType === "file";
        }
    },
    // content: {
    //     type: String,
    //     validate: {
    //         validator: function (value) {
    //             return this.messageType !== "text" || (value && value.trim().length > 0);
    //         },
    //         message: "Content is required when messageType is 'text'.",
    //     },
    // },
    // fileUrl: {
    //     type: String,
    //     validate: {
    //         validator: function (value) {
    //             return this.messageType !== "file" || (value && value.trim().length > 0);
    //         },
    //         message: "fileUrl is required when messageType is 'file'.",
    //     },
    // },
    timestamp: {
        type: Date,
        default: Date.now,
    }
})

const Message = mongoose.model("Messages", messagesSchema);

export default Message;