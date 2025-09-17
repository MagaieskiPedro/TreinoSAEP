from django.urls import path
from . import views

urlpatterns = [
    path('usuario/', view=views.UsuarioView.as_view()),
    path('criarTarefa/', view=views.CreateTarefaView.as_view()),
    path('gerenciarTarefa/<int:pk>', view=views.UpdateTarefaView.as_view()),
    path('deletarTarefa/<int:pk>', view=views.DeleteTarefaView.as_view()),
]