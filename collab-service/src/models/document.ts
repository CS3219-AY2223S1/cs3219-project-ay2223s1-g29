import mongoose from 'mongoose';

export interface Document {
    _id?: string;
    id: string;
    data: Object;
}

const documentSchema = new mongoose.Schema({
    data: Object,
})

export const DocumentModel = mongoose.model<Document>('document', documentSchema);
