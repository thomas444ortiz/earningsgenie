from django.urls import path
from .views import DocumentView, CompanyView

urlpatterns = [
    path('document', DocumentView.as_view()),
    path('company', CompanyView.as_view()),
]
