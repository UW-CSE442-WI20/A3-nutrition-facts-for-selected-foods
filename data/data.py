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

def get_category_name(s):
    return s.replace("-", " ").title()
    

def get_size_name(s, row):
    if s == "8.0" or s == "8":
        return "01_Short (8 fl. oz.)"
    if s == "12.0" or s == "12":
        return "02_Tall (12 fl. oz.)"
    if s == "16.0" or s == "16":
        return "03_Grande (16 fl. oz.)"
    if s == "20.0" or s == "20":
        return "04_Venti (20 fl. oz.)"
    if s == "24.0" or s == "24":
        return "05_Venti Iced (24 fl. oz.)"
    if s == "30.0" or s == "30":
        return "06_Trenta (30 fl. oz.)"
    return "07_" + s + " fl. oz."  # Bottled drinks have weird sizes

res = {}

with open("drinks.csv", newline="") as f:
    reader = csv.DictReader(f)
    for row in reader:
        category = get_category_name(row["Category"]).strip()
        name = row["Name"].strip()
        portion = get_size_name(row["Portion(fl oz)"], row)
        milk = row["Milk"].strip() or "N/A"
        whip = row["Whipped Cream"] or "N/A".strip()

        if "Iced Espresso Classics - Vanilla Latte" in name:
            continue

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
    json.dump(res, f, separators=(',', ':'), sort_keys=True)

print("Done!")


