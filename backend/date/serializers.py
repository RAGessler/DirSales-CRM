from rest_framework import serializers
from .models import Date

class DateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Date
        fields = ['id', 'contact_id', 'user_id', 'title', 'time', 'text', 'date']
        depth = 1