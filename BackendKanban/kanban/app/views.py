from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, DestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Usuario, Tarefa
from .serializer import UsuarioSerializer,  TarefaSerializer
# Create your views here.

class UsuarioView(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class CreateTarefaView(ListCreateAPIView):
    queryset = Tarefa.objects.all()
    serializer_class =TarefaSerializer
    
class UpdateTarefaView(APIView):

    def get_object(self, pk):
        try:
            return Tarefa.objects.get(pk=pk)
        except Tarefa.DoesNotExist:
            return None
    def patch(self, request, pk):
        
        Tarefa = self.get_object(pk)
        if Tarefa is None:
            return Response({'detail': 'Tarefa not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = TarefaSerializer(Tarefa, data=request.data, partial=True)  # partial=True permite atualizações parciais
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DeleteTarefaView(DestroyAPIView):
    queryset = Tarefa.objects.all()
    serializer_class =TarefaSerializer
    lookup_field = 'pk'