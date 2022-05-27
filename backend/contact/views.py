from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Contact
from .serializers import ContactSerializer

# Create your views here.

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_contacts(request):
    if request.method == 'GET':
        contacts = Contact.objects.filter(user_id=request.user.id)
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'DELETE', 'PATCH'])
@permission_classes([IsAuthenticated])
def contact_detail(request, pk):
    contact = get_object_or_404(Contact, pk=pk)
    if request.method == 'GET':
        serializer = ContactSerializer(contact)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == "DELETE":
        serializer = ContactSerializer(contact)
        contact.delete()
        return_value = serializer.data
        return_value['id'] = pk
        return Response(return_value, status=status.HTTP_204_NO_CONTENT)
    elif request.method == "PATCH":
        serializer = ContactSerializer(contact, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    