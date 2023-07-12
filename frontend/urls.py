from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('filings', index),
    path('uploadtranscript', index),  
]
