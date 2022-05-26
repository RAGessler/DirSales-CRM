from dataclasses import fields
from rest_framework import serializers
from .models import Interaction

class InteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interaction
        fields = ['id', 'contact', 'type', 'date', 'time', 'notes']
        depth = 1