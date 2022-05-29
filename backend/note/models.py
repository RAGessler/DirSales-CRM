from datetime import date
from django.db import models
from authentication.models import User
from contact.models import Contact
# Create your models here.

class Note(models.Model):
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)
    text = models.CharField(max_length=255)