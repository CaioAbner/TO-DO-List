from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Tarefa
from .serializers import TarefaSerializer

class TarefasList(APIView):
    def get(self, request):
        tarefas = Tarefa.objects.all()
        serializer = TarefaSerializer(tarefas, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = TarefaSerializer(data=request.data)
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TarefasDetail(APIView):
    def get(self, request, pk):
        tarefa = get_object_or_404(Tarefa, pk=pk)
        serializer = TarefaSerializer(tarefa)
        return Response(serializer.data)
    
    def put(self, request, pk):
        tarefa = get_object_or_404(Tarefa, pk=pk)
        serializer = TarefaSerializer(tarefa, data=request.data)
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        tarefa = get_object_or_404(Tarefa, pk=pk)
        tarefa.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)