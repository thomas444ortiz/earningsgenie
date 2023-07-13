from django.urls import path
from .views import DocumentView, CompanyView, SingleCompanyView

urlpatterns = [
    path('documents', DocumentView.as_view(), name='documents'),
    path('companies', CompanyView.as_view(), name='companies'),
    path('companies/<str:ticker>', SingleCompanyView.as_view(), name='company')
]
