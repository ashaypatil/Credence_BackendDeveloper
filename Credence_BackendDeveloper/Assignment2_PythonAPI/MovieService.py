#Movie Service
#imports
import json
from flask import Flask
from flask_mongoengine import MongoEngine

app = Flask(__name__)

#mongodb uri string (user,password,dbname included)
#mongodb+srv://<username>:<password>@cluster0.jaad9.mongodb.net/<dbname>?retryWrites=true&w=majority

DB_URI = "mongodb+srv://ashay:khl6Z1EP1YXLv3ho@cluster0.jaad9.mongodb.net/movie_portal?retryWrites=true&w=majority"

#configuring app with mongobdhosturi
app.config["MONGODB_HOST"] = DB_URI

#creating and initialising mongoengine object
db = MongoEngine()
db.init_app(app)

#Movies model for fetching movie data
class Movies(db.Document):
    name = db.StringField()
    img = db.StringField()
    summary = db.StringField()
    #function to convert the object into json string
    def to_json(self):
        return {"name": self.name,
                "img": self.img,
                "summary": self.summary,}

#endpoint or route to get movie list from the api or service
@app.route('/getmovies')
#function to get list of movie in json string format
def getmovie():
    #querying all document objects from mongodb
    movie= Movies.objects().to_json()
    return movie

if __name__ == '__main__':
    #pass debug=True as parameter in run() function to enable debug
    app.run()