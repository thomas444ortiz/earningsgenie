from django.urls import path
from .views import DocumentView, CompanyView, SingleCompanyView, CompanyDocumentsView, SingleDocumentView

urlpatterns = [
    path('documents', DocumentView.as_view(), name='documents'),
    path('documents/<str:id>', SingleDocumentView.as_view(), name='document'),
    path('companies', CompanyView.as_view(), name='companies'),
    path('companies/<str:ticker>', SingleCompanyView.as_view(), name='company'),
    path('companies/<str:ticker>/documents', CompanyDocumentsView.as_view(), name='company-documents')
]
