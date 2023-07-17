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
from django.db import IntegrityError
from django.contrib.auth.models import User
from .utils import validateEmail
import chromadb
import sys
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import logout
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes

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
        return Document.objects.filter(company=company).order_by('-date')

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

@csrf_exempt
def RegisterUser(request):
    if request.method == "POST":
        #Get the data
        data = json.loads(request.body)
        email = data.get('email', None)
        password = data.get('password', None)
        confirm_password = data.get('confirmPassword', None)
        #Make sure the passwords match
        if (password != confirm_password):
            return JsonResponse({"response": 'Passwords do not match'})
        if (len(password) < 6):
            return JsonResponse({"response": 'Please enter a password that is 6 characters or more'})       
        #Validate the email
        if (validateEmail(email) == False):
            return JsonResponse({"response": 'Please enter a valid email'})
        #Create the user (Django will handle a lot of the error checking work here)
        try:
            user = User.objects.create_user(username=email, email=email, password=password)
            user.save()
            token = Token.objects.create(user=user)               
        except IntegrityError:
            return JsonResponse({"response": 'Email already exists'})
    return JsonResponse({"response": 'To Do: auto log in the user and redirect'})

@csrf_exempt
def LoginUser(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username', None)
        password = data.get('password', None)

        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)  # get the token for this user
            return JsonResponse({'token': str(token)}, status=200)  # return the token in the response
        else:
            return JsonResponse({'error': 'Invalid login credentials.'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)
    

class Logout(APIView):
    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        logout(request)
        return Response(status=status.HTTP_200_OK)
    
@csrf_exempt
def CheckToken(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        token = data.get('token', None)
        
        # Add _ to ignore the token
        user, _ = TokenAuthentication().authenticate_credentials(token)
        
        if user is not None:
            # Include the user's email in the response
            return JsonResponse({'status': 'valid token', 'email': user.email}, status=200)
        else:
            return JsonResponse({'status': 'invalid token'}, status=401)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)
