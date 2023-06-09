#carrier_handler.py
from db_handler import Db_handler
from airplane import Airplane
import config as cfg
import pickle
from route_handler import Route
import datetime


db_handler = Db_handler()

import os

base_dir = os.path.dirname(os.path.abspath(__file__))
save_path = os.path.join(base_dir, 'save', 'carrier_save.pickle')
class Carrier():
    # TI = To Implement
    def __init__(self, name, headquarters):
        # Creates a new Carrier for the player
        self.name = name
        self.airplanes = []

        # Shouldn't be hardcoded!
        self.headquarters = "EFHK"
        self.id = 1
        self.game_start_time = datetime.datetime.now()
        cfg.set_game_start_time(self.game_start_time)
        self.resources = ["fuel", "money"]
        self.fuel = cfg.STARTING_FUEL
        self.money = cfg.STARTING_MONEY
        self.active_routes = {}
        self.deleted_routes=[]

        db_handler.add_carrier(self)

    def new_plane(self, type, airplane_name="Airplane"):
        id = db_handler.add_airplane(
            self.headquarters, self, type, airplane_name)
        airport = db_handler.add_airport(self.headquarters)
        self.airplanes.append(Airplane(self.id, type, airport, id))

    def update_resource(self, resource, amount):
        # Method to add / remove given amount of resources
        # Stupid/unusefull method??
        if hasattr(self, resource):
            setattr(self, resource, getattr(self, resource) + amount)
        else:
            print(f"Resource '{resource}' not found.")

    def buy_fuel(self, amount):
        price = amount*cfg.FUEL_PRICE_PER_LITER
        if self.money >= price:
            self.fuel += amount
            self.money -= price
        else:
            amount = self.money/cfg.FUEL_PRICE_PER_LITER
            self.fuel += amount
            self.money -= price

    def get_resources(self):
        # Returns list of tuples with resource name and amount
        results = []
        for resource in self.resources:
            if hasattr(self, resource):
                results.append((resource, getattr(self, resource)))
        return results

    def save(self):
        with open(save_path, 'wb') as f:
            pickle.dump(self, f)
