import csv
import json

"""

The goal is to facilitate fast lookup by category and name

{
    category: {
        name: {
            portion(fl oz.) {
                milk: {
                    almond: { ... }
                    2%:     { ... }
                    N/A:    { ... }
                    half and half: {
                        whipped cream: {
                            Sweetend {
                                Calories,
                                Calories from fat,
                                Total Fat(g),
                                Saturated fat(g),
                                Trans fat(g),
                                Cholesterol(mg),
                                Sodium(mg),
                                Total Carbohydrate(g),
                                Dietary Fiber(g),
                                Sugars(g),
                                Protein(g),
                                Caffeine(mg)
                            }
                            Unsweetened: {}
                            None: {}    
                        }
                    }
                }
            }
        }
    }
}

"""

res = {}

with open("drinks.csv", newline="") as f:
    reader = csv.DictReader(f)
    for row in reader:
        category = row["Category"]
        name = row["Name"]
        portion = row["Portion(fl oz)"]
        milk = row["Milk"] or "N/A"
        whip = row["Whipped Cream"] or "N/A"

        if category not in res:
            res[category] = {}
        if name not in res[category]:
            res[category][name] = {}
        if portion not in res[category][name]:
            res[category][name][portion] = {}
        if milk not in res[category][name][portion]:
            res[category][name][portion][milk] = {}
        if whip not in res[category][name][portion][milk]:
            res[category][name][portion][milk][whip] = row

with open("drinks.json", "w+") as f:
    json.dump(res, f, separators=(',', ':'))

print("Done!")