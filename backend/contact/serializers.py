from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id','user_id',
        'first_name', 'last_name',
         'phone_number','twitter_handle',
          "instagram_handle","other_handle",
           'tag' ]
        depth = 1