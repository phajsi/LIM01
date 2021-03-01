from django.db import models

# Create your models here.
class Chat(models.Model):
    chatquestion = models.CharField(max_length=1000)
    userreply = models.CharField(max_length=1000)
    defaultreply = models.CharField(max_length=1000)
    answer1 = models.CharField(max_length=1000)
    answer2 = models.CharField(max_length=1000)
    correctanswer = models.CharField(max_length=1000)