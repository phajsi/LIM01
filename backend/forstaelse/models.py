from django.db import models

# Create your models here.
class Forstaelse(models.Model):
    ANSWER_STATE = (
        ('true', 'true'),
        ('false', 'false')
    )
    chat = models.CharField(max_length=1000)
    question = models.CharField(max_length=1000)
    answer = models.CharField(max_length=5, choices=ANSWER_STATE)
    explanation = models.CharField(max_length=1000)