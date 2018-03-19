class RatingCalculator:
    def calculateRating(self,ratings,similariy):
        weightedSum=0.0
        sumWeights=0.0
        for rating in ratings:
            weightedSum+=rating.count*rating.ratingValue
            sumWeights+=rating.count
        weightedSum/=sumWeights
        return weightedSum+similariy
    
