from datetime import date
from django.db import models
from contact.models import Contact
# Create your models here.

class Interaction(models.Model):
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE)
    type = models.CharField(max_length=50)
    date = models.DateField()
    time = models.TimeField()
    notes = models.CharField(max_length=255)