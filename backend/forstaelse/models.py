from django.db import models

# Create your models here.
class Forstaelse(models.Model):
    ANSWER_STATE = (
        ('true', 'true'),
        ('false', 'false')
    )
    chat1 = models.CharField(max_length=1000)
    question1 = models.CharField(max_length=1000)
    answer1 = models.CharField(max_length=5, choices=ANSWER_STATE)
    explanation1 = models.CharField(max_length=1000)

    chat2 = models.CharField(max_length=1000, blank=True)
    question2 = models.CharField(max_length=1000, blank=True)
    answer2 = models.CharField(max_length=5, choices=ANSWER_STATE, blank=True)
    explanation2 = models.CharField(max_length=1000, blank=True)

    chat3 = models.CharField(max_length=1000, blank=True)
    question3 = models.CharField(max_length=1000, blank=True)
    answer3 = models.CharField(max_length=5, choices=ANSWER_STATE, blank=True)
    explanation3 = models.CharField(max_length=1000, blank=True)