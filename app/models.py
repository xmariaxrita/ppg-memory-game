from django.db import models

# Create your models here.

class Usuario(models.Model) :
    id_user = models.AutoField(primary_key=True)
    username = models.CharField(max_length=25, null=False)