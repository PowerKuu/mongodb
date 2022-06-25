import {Db, MongoClient, Document} from "mongodb"

interface DatabaseConfigType {
    cluster: string,
    username: string,
    password: string
}

export default class MongodbClient {
    url: string
    client: MongoClient
    database: Db

    constructor(DatabaseName, DatabaseConfig:DatabaseConfigType){  
        this.url = `mongodb+srv://${DatabaseConfig.username}:${encodeURIComponent(DatabaseConfig.password)}@${DatabaseConfig.cluster}.ycebo.mongodb.net?retryWrites=true&w=majority`
        this.client =  new MongoClient(this.url)
        this.database = this.client.db(DatabaseName)
    }

    async connect(){
        await this.client.connect()
        return {
            GetCollection: this.#GetCollection
        }
    }
    
    #GetCollection(CollectionName:string){  
        const collection = this.database.collection(CollectionName)
        return {
            //? GET
            GetAll: async () => {
                return collection.find().toArray()
            },
            GetMultiple: async (value:Document) => {
                return collection.find(value).toArray()
            },
            GetOne: async (value) => {
                return collection.findOne(value)
            },

            //? ADD
            AddOne: async (value) => {
                return collection.insertOne(value)
            },
            AddMultiple: async (value) => {
                return collection.insertMany(value)
            },

            //? DELETE
            DeleteOne: async (value) => {
                return collection.deleteOne(value)
            },
            DeleteMany: async (value) => {
                return collection.deleteMany(value)
            },
        }
    }
}