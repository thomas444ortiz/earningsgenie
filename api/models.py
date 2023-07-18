from django.db import models
from django.contrib.auth.models import AbstractUser

#Model for a company
class Company(models.Model):
    ticker = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.ticker + " " + self.name

#Model for a document
class Document(models.Model):
    document_type = models.CharField(max_length=10, choices=[('transcript', 'transcript'), ('filing', 'filing'), ('other', 'other')])
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    date = models.DateField()
    title = models.CharField(max_length=100)
    body = models.TextField()
    def __str__(self):
        return self.title + " " + str(self.company)