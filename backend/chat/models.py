from django.db import models

# Create your models here.
class Chat(models.Model):
    ANSWER_STATE = (
        ('true', 'true'),
        ('false', 'false')
    )
    chatquestion = models.CharField(max_length=1000)
    userreply = models.CharField(max_length=1000)
    defaultreply = models.CharField(max_length=1000)
    answer = models.CharField(max_length=5, choices=ANSWER_STATE)