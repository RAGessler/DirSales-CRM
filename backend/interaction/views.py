from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Interaction
from .serializers import InteractionSerializer
from contact.models import Contact



# Create your views here.
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def contact_interactions(request, pk):
    contact = get_object_or_404(Contact, pk=pk)
    if request.method == 'GET':
        interactions = Interaction.objects.filter(contact_id=contact.id)
        serializer = InteractionSerializer(interactions, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = InteractionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(contact_id=contact.id)
            return Response(serializer.data)

@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def specific_interactions(request, pk):
    interaction = get_object_or_404(Interaction, pk=pk)
    if request.method == 'GET':
        serializer = InteractionSerializer(interaction)
        return Response(serializer.data)
    elif request.method == 'PATCH':
        serializer = InteractionSerializer(interaction, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    elif request.method == "DELETE":
        serializer = InteractionSerializer(interaction)
        interaction.delete()
        return_value = serializer.data
        return_value['id'] = pk
        return Response(return_value, status=status.HTTP_204_NO_CONTENT)
