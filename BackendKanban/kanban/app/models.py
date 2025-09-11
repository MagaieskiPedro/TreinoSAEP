from django.db import models
import datetime

# Create your models here.
PRIORIDADE = [
    ('BAIXA','BAIXA'),
    ('MEDIA','MEDIA'),
    ('ALTA','ALTA')
]

STATUS = [
    ('A FAZER', 'A FAZER'),
    ('FAZENDO', 'FAZENDO'),
    ('FEITO', 'FEITO')
]

class Usuario(models.Model):
    nome = models.CharField(max_length=200)
    email = models.EmailField()
    def __str__(self):
        return self.nome

class Tarefa(models.Model):
    descricao = models.CharField(max_length=200)
    nomeSetor = models.CharField(max_length=200)
    dataCadastro = models.DateField(default=datetime.date.today)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    prioridade = models.CharField(choices=PRIORIDADE)
    status = models.CharField(choices=STATUS, default="A FAZER")
    def __str__(self):
        return self.descricao

