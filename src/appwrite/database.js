import { config } from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

class DBServies {
    client = new Client();
    databases;
    storage;
    constructor() {
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }
    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status,
                userId
            })
        }
        catch (error) {
            console.log("Appwrite createPost error", error);
        }
    }
    async updatePost(slug, {title, content, featuredImage, status, userId}) {
        try {
            return await this.databases.updateDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status
            })
        }
        catch (error) {
            console.log("Appwrite updatePost error", error);
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug);
            return true;
        }
        catch (error) {
            console.log("Appwrite deletePost error:", error);
        }
        return false;
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug);
        }
        catch (error) {
            console.log("Appwrite getPost error:", error);
        }
        return false;
    }
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteCollectionId, queries);
        }
        catch (error) {
            console.log("Appwrite getPosts error:", error);
        }
        return false;
    }
    async uploadFile(file, slug) {
        try {
            return await this.storage.createFile(config.appwriteBucketId, slug, file);
        }
        catch (error) {
            console.log("Appwrite uploadFile error:", error);
        }
        return false;
    }
    async deleteFile(slug) {
        try {
            await this.storage.deleteFile(config.appwriteBucketId, slug);
            return true;
        }
        catch (error) {
            console.log("Appwrite deleteFile error:", error);
        }
        return false;
    }
    getFilePreview(slug) {
        return this.storage.getFilePreview(config.appwriteBucketId, slug);
    }
}
const dbService = new DBServies();
export default dbService;