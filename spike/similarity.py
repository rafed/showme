#!usr/bin/python

from sklearn.feature_extraction.text

vect = TfidfVectorizer(min_df=1)
tfidf = vect.fit_transform([str1, str2, str3])
mat = (tfidf * tfidf.T).A
print mat
