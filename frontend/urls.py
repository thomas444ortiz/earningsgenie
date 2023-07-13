from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name='about'),
    path('filings', index, name='filings'),
    path('uploadtranscript', index, name='uploadtranscript'),  
    path('login', index, name='login'),
    path('register', index, name='register'),
]
