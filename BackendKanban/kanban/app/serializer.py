from rest_framework import serializers
from .models import Usuario,Tarefa

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class TarefaSerializer(serializers.ModelSerializer):
      usuario = serializers.CharField(source='usuario.nome', read_only=True)
      class Meta:
        model = Tarefa
        fields = '__all__'
        