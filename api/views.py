from django.shortcuts import render
from rest_framework import generics
from .serializers import DocumentSerializer, CompanySerializer
from .models import Document, Company

# Create your views here.
class DocumentView(generics.ListAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

class CompanyView(generics.ListAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer