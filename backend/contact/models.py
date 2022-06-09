from django.db import models
from authentication.models import User

# Create your models here.

class Contact(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=16, blank=True)
    twitter_handle = models.CharField(max_length=255, blank=True)
    instagram_handle = models.CharField(max_length=255, blank=True)
    other_handle = models.CharField(max_length=255, blank=True)
    tag = models.CharField(max_length=255)