from dataclasses import field
from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'contact', 'date', 'time', 'text']
        depth = 1