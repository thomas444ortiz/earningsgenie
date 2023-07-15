from rest_framework import serializers
from .models import Company, Document


#Creates a serializer class for the Company model, which will take the data from the database and convert it to JSON and vice versa
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'
    
#Creates a serializer class for the Document model, which will take the data from the database and convert it to JSON and vice versa    
class DocumentSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Document
        fields = '__all__'