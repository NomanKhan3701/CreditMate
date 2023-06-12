import os
from fastapi.exceptions import RequestValidationError
from datetime import datetime
from fastapi.responses import JSONResponse
from starlette.status import HTTP_422_UNPROCESSABLE_ENTITY
from fastapi import FastAPI, APIRouter, HTTPException, Request
from app.models import Place
import http
from fastapi import FastAPI, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
import googlemaps
from pymongo import MongoClient


app = FastAPI()
gmaps = googlemaps.Client(key=os.getenv("MAPS_API_KEY"))
client = MongoClient(os.getenv("MONGO_URL"))
db = client["test"]


@app.post("/api/places")
async def offers_nearby(place: Place):
    places_collection = db["places"]
    offers_collection = db["offers"]

    response = dict()
    if place.text:
        geocode_result = gmaps.geocode(place.text)
        location = geocode_result[0]["geometry"]["location"]
    elif place.lat and place.lng:
        location = (place.lat, place.lng)
    else:
        raise HTTPException(
            detail="Provide text or both latitude and longitude",
            status_code=HTTP_422_UNPROCESSABLE_ENTITY,
        )

    params = {"location": location, "radius": place.radius, "type": place.types}
    response = gmaps.places_nearby(**params)

    now = datetime.utcnow()
    offers = {}
    for res in response["results"]:
        filter = {"place_id": res["place_id"]}
        document = places_collection.find_one(filter)
        place_info = res
        place_info["created_at"] = now
        place_info["updated_at"] = now
        if document:
            result = places_collection.update_one(filter, {"$set": place_info})
        else:
            result = places_collection.insert_one(place_info)

        offer_by_company = offers_collection.find({"company": res["name"]}, {"_id": 0})
        offers[res["name"]] = list(offer_by_company)

    return offers
