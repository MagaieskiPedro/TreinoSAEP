from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateAPIView

from .models import Usuario, Tarefa
from .serializer import UsuarioSerializer,  TarefaSerializer
# Create your views here.

class UsuarioView(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class =UsuarioSerializer

class CreateTarefaView(ListCreateAPIView):
    queryset = Tarefa.objects.all()
    serializer_class =TarefaSerializer
    
class UpdateTarefaView(RetrieveUpdateAPIView):
    queryset = Tarefa.objects.all()
    serializer_class =TarefaSerializer
    lookup_field = 'pk'