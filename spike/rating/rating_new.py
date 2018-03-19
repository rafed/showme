import csv
from rating import Rating
from ratingcalculator import RatingCalculator

def testRating(reader, similarity):
    dict = {}
    ratingList = []
    for line in reader:
        ratingValue = int(line['Rating'])
        if ratingValue in dict:
            dict[ratingValue] += 1
        else:
            dict[ratingValue] = 1

    for ratingValue, count in dict.items():
        rating = Rating()
        rating.ratingValue = ratingValue
        rating.count = count
        ratingList.append(rating)
    ratingCalculator = RatingCalculator()
    print ratingCalculator.calculateRating(ratingList,similarity)
    
if __name__ == "__main__":
    with open('rating.csv', 'rb') as f:
        similarity = 0.25
        reader = csv.DictReader(f, delimiter=',')
        testRating(reader, similarity)
