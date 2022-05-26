from cgitb import text
from django.db import models
from contact.models import Contact

# Create your models here.

class Task(models.Model):
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    complete = models.BooleanField(default=False)
