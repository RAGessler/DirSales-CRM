from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Date
from .serializers import DateSerializer
from contact.models import Contact


# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_dates(request):
    if request.method == 'GET':
        dates = Date.objects.filter(user_id=request.user.id)
        serializer = DateSerializer(dates, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def contact_dates(request, pk):
    contact = get_object_or_404(Contact, pk=pk)
    if request.method == "POST":
        serializer = DateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user_id=request.user.id, contact_id=contact.id)
            return Response(serializer.data)
    elif request.method == "GET":
        dates = Date.objects.filter(contact_id=contact.id)
        serializer = DateSerializer(dates, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['GET','PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def specific_dates(request, pk):
    date = get_object_or_404(Date, pk=pk)
    if request.method == 'GET':
        serializer = DateSerializer(date)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PATCH':
        serializer = DateSerializer(date, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    elif request.method == "DELETE":
        serializer = DateSerializer(date)
        date.delete()
        return_value = serializer.data
        return_value['id'] = pk
        return Response(return_value, status=status.HTTP_204_NO_CONTENT)
    