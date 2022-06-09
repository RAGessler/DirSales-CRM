from time import time
from django.db import models
from authentication.models import User
from contact.models import Contact
# Create your models here.

class Date(models.Model):
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    time = models.TimeField(auto_now=False, auto_now_add=False)
    text = models.CharField(max_length=255, blank=True)
    date = models.DateField()