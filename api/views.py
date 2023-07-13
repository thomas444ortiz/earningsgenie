from django.shortcuts import render
from rest_framework import generics, status
from .serializers import DocumentSerializer, CompanySerializer
from .models import Document, Company
from rest_framework.views import APIView
from rest_framework.response import Response

class DocumentView(generics.ListAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

class CompanyView(generics.ListAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class SingleCompanyView(generics.RetrieveAPIView): 
    lookup_field = 'ticker'
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
