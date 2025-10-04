import { ObjectId } from 'mongodb';

export function serializeMongoDB(obj: any): any {
    if (!obj) return obj;
    if (Array.isArray(obj)) return obj.map(serializeMongoDB);
    if (obj instanceof ObjectId) return obj.toString();
    if (obj instanceof Date) return obj.toISOString();
    if (typeof obj === 'object') {
        const serialized: any = {};
        for (const [key, value] of Object.entries(obj)) {
            serialized[key] = serializeMongoDB(value);
        }
        return serialized;
    }
    return obj;
}