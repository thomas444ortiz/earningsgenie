from rest_framework import generics
from .serializers import DocumentSerializer, CompanySerializer
from .models import Document, Company
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from langchain.chat_models import ChatOpenAI
from PyPDF2 import PdfReader
import tempfile
#Imports related to langchain
import os
from api.apikey import apikey
import streamlit as st
from langchain.document_loaders import TextLoader
from langchain.indexes import VectorstoreIndexCreator

#Define my api key for the openai API
os.environ['OPENAI_API_KEY'] = apikey

#This will return all documents in the database
class DocumentView(generics.ListAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

#This will return all companies in the database
class CompanyView(generics.ListAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

#This will return a single company in the database
class SingleCompanyView(generics.RetrieveAPIView): 
    lookup_field = 'ticker'
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

#This will return all documents for a single company in the database
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

#This will return a single document in the database
class SingleDocumentView(generics.RetrieveAPIView): 
    lookup_field = 'id'
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

#This will take user input, and a file/ string as input, and return a response from the langchain model
@csrf_exempt
def ProcessUserInput(request):
   #If the user uploads a pdf file
   if request.method == 'POST':
        #First, extract the text and user input, either direct of from an uploaded pdf
        if 'file' in request.FILES:
            # process PDF file
            pdf_file = request.FILES['file']
            input = request.POST.get('text', '')
            # or if you just want to read the contents
            reader = PdfReader(pdf_file)
            contents = ''
            for page in reader.pages:
                contents += page.extract_text()
        #Otherwise, which is if the user calls this function from the document page for already uploaded documents
        else:
            # process text
            data = json.loads(request.body.decode('utf-8'))
            input = data.get('text', None)
            contents = data.get('body', None)       

        # Create a temporary file to store the text, this is necessary because textloader has to load from a file
        with tempfile.NamedTemporaryFile(delete=False) as tmp:
            tmp.write(contents.encode())

        # Use TextLoader to load from the temporary file
        loader = TextLoader(tmp.name)

        #index that wraps above steps
        index = VectorstoreIndexCreator().from_loaders([loader])

        # Delete the temporary file
        os.unlink(tmp.name)
        
        #get the response from the langchain model
        response_message = index.query(input, ChatOpenAI(temperature=0.9))
        #return the response
        return JsonResponse({"response": response_message})