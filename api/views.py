from django.shortcuts import render
from rest_framework import generics, status
from .serializers import DocumentSerializer, CompanySerializer
from .models import Document, Company
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
import PyPDF2
import io
from langchain.chat_models import ChatOpenAI
from PyPDF2 import PdfReader
import tempfile
#Imports related to langchain
import os
from api.apikey import apikey
import sys

import streamlit as st
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.document_loaders import WebBaseLoader, TextLoader
from langchain.indexes import VectorstoreIndexCreator

os.environ['OPENAI_API_KEY'] = apikey


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
        #Print the inputs just to make sure we are getting the data correctly
        print(contents)
        print(input)        

        # Create a temporary file
        with tempfile.NamedTemporaryFile(delete=False) as tmp:
            tmp.write(contents.encode())

        # Use TextLoader to load from the temporary file
        loader = TextLoader(tmp.name)

        #index that wraps above steps
        index = VectorstoreIndexCreator().from_loaders([loader])

        # Delete the temporary file
        os.unlink(tmp.name)

        response_message = index.query(input, ChatOpenAI(temperature=0.9))
        print(response_message)
        return JsonResponse({"response": response_message})


   








#llm stuff division for just regular chatbot
        #Prompt template
        #question_template = PromptTemplate (
        #    input_variables = ['user_question'],
         #   template = """You are a financial analyst reading through important documents, which are either public company filings or transcripts of earnings calls. 
         #   You have been tasked with answering questions on the document which you have analyzed. You are able to give a concise and insightful response. The
         #   question you have been asked is: {user_question}"""
        #)
        
        #Some llm stuff
        #llm = OpenAI(temperature=0.9)
        #title_chain = LLMChain(llm=llm, prompt=question_template, verbose=True)
        #response = title_chain.run(user_question=input)
        #regular chatbot
        #print(response)

