import mongoose from "mongoose";
import { Document, DocumentModel } from "../models/document";

export default async () => {
    const io = require("socket.io")(3002, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"],
        },
      })
      
      const defaultValue = ""
      
      io.on("connection", socket => {
        socket.on("get-document", async documentId => {
          const document = await findOrCreateDocument(documentId)
          socket.join(documentId)
          socket.emit("load-document", "test")
      
          socket.on("send-changes", delta => {
            socket.broadcast.to(documentId).emit("receive-changes", delta)
          })
      
          socket.on("save-document", async data => {
            console.log(data)
            await DocumentModel.findOneAndUpdate({id:documentId}, { data })
          })
        })
      })
      
      async function findOrCreateDocument(id) {
        if (id == null) return
      
        const document = await DocumentModel.findOne({id})
        if (document) return document
        return await DocumentModel.create({ id, data: defaultValue })
      }
}
