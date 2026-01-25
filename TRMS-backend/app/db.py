import motor.motor_asyncio

# If .env file, use dotenv, otherwise this URI
MONGO_URI = "mongodb://localhost:27017"
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client.trms