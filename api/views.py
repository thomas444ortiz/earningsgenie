from django.shortcuts import render
from rest_framework import generics, status
from .serializers import DocumentSerializer, CompanySerializer
from .models import Document, Company
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

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

class CompanyDocumentsView(generics.ListAPIView):
    serializer_class = DocumentSerializer

    def get_queryset(self):
        """
        This view should return a list of all the documents for
        the company as determined by the ticker portion of the URL.
        """
        ticker = self.kwargs['ticker']
        company = get_object_or_404(Company, ticker=ticker)
        return Document.objects.filter(company=company)

class SingleDocumentView(generics.RetrieveAPIView): 
    lookup_field = 'id'
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
