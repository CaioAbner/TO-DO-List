from django.db import models

class Tarefa(models.Model):
    titulo = models.CharField(max_length=50, null=False, blank=False)
    descricao = models.TextField(blank=True, null=True)
    concluida = models.BooleanField(default=False)
    criada_em = models.DateTimeField(auto_now_add=True)

def __str__(self):
    return self.titulo