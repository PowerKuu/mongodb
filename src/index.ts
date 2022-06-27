import {Db, MongoClient, Document, Collection} from "mongodb"

interface DatabaseConfigType {
    cluster: string,
    username: string,
    password: string
}

export class database {
    url: string
    MongoDatabase: Db
    MongodbClient: MongoClient

    constructor(DatabaseName, DatabaseConfig:DatabaseConfigType){  
        this.url = `mongodb+srv://${DatabaseConfig.username}:${encodeURIComponent(DatabaseConfig.password)}@${DatabaseConfig.cluster}.ycebo.mongodb.net?retryWrites=true&w=majority`
        this.MongodbClient = new MongoClient(this.url)
        this.MongoDatabase = this.MongodbClient.db(DatabaseName)
    }

    async connect() {
        await this.MongodbClient.connect()
        return this
    }
}

export class collection {
    name: string
    database:database

    collection:Collection<Document>


    constructor(name, database:database) {
        this.database = database
        this.collection = this.database.MongoDatabase.collection(name)
    }    


    //? GET
    async GetAll() {
        return this.collection.find().toArray()
    }
    async GetMultiple(value:Document) {
        return this.collection.find(value).toArray()
    }
    async GetOne(value) {
        return this.collection.findOne(value)
    }

    //? ADD
    async AddOne(value) {
        return this.collection.insertOne(value)
    }
    async AddMultiple(value) {
        return this.collection.insertMany(value)
    }

    //? DELETE
    async DeleteOne(value) {
        return this.collection.deleteOne(value)
    }
    async DeleteMany(value) {
        return this.collection.deleteMany(value)
    }
}