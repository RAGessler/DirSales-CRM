from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Task
from .serializers import TaskSerializer
from contact.models import Contact

# Create your views here.
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def contact_tasks(request, pk):
    contact = get_object_or_404(Contact, pk=pk)
    if request.method == 'GET':
        tasks = Task.objects.filter(contact_id=contact.id)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    elif request.method =="POST":
        serializer = TaskSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(contact_id = contact.id)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def specific_task(request, pk):
    task = get_object_or_404(Task, pk=pk)
    if request.method == "GET":
        serializer = TaskSerializer(task)
        return Response(serializer.data)
    elif request.method == "PATCH":
        serializer = TaskSerializer(task, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    elif request.method == 'DELETE':
        serailizer = TaskSerializer(task)
        task.delete()
        return_value = serailizer.data
        return_value['id'] = pk
        return Response(return_value, status=status.HTTP_204_NO_CONTENT)
