from django.urls import path
from .views import DocumentView, CompanyView, SingleCompanyView, CompanyDocumentsView, SingleDocumentView
from .views import ProcessUserInput, RegisterUser, LoginUser

urlpatterns = [
    #Path to retrieve all documents
    path('documents', DocumentView.as_view(), name='documents'),
    #Path to retrieve a single document
    path('documents/<str:id>', SingleDocumentView.as_view(), name='document'),
    #Path to retrieve all companies
    path('companies', CompanyView.as_view(), name='companies'),
    #Path to retrieve a single company
    path('companies/<str:ticker>', SingleCompanyView.as_view(), name='company'),
    #Path to retrieve all documents for a single company
    path('companies/<str:ticker>/documents', CompanyDocumentsView.as_view(), name='company-documents'),
    #Path to submit user inputß
    path('submit-text', ProcessUserInput, name='submit-text'),
    #Path to register a new user
    path('register', RegisterUser, name='register'),
    #Path to login a user
    path('login', LoginUser, name='login'),
    #Path to logout a user 
    
]
