from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from .models import Date

class DateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Date
        fields = ['id', 'contact', 'user', 'title', 'time', 'text', 'date']
        depth = 1