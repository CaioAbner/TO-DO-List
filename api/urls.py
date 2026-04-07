from django.urls import path

from .views import TarefasList, TarefasDetail

urlpatterns = [
    path('tarefas/', TarefasList.as_view(), name='tarefas-list'),
    path('tarefas/<int:pk>/', TarefasDetail.as_view(), name='tarefas-detail')
]