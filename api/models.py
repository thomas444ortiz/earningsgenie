from django.db import models
from django.contrib.auth.models import AbstractUser

#Model for a company
class Company(models.Model):
    ticker = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    #ToDo: provide more information on the company
    def __str__(self):
        return self.ticker + " " + self.name

#Model for a document
class Document(models.Model):
    document_type = models.CharField(max_length=10, choices=[('transcript', 'transcript'), ('filing', 'filing'), ('other', 'other')])
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    date = models.DateField()
    title = models.CharField(max_length=100)
    body = models.TextField()
    #ToDo: add in other format to hold the body of the doc in a format that could look better
    def __str__(self):
        return self.title + " " + str(self.company)