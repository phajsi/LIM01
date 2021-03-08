from django.db import models

# Create your models here.
class Chat(models.Model):
    chatquestion1 = models.CharField(max_length=1000)
    answer11 = models.CharField(max_length=1000)
    answer12 = models.CharField(max_length=1000)
    correctanswer1 = models.CharField(max_length=1000)

    chatquestion2 = models.CharField(max_length=1000, blank=True)
    answer21 = models.CharField(max_length=1000, blank=True)
    answer22 = models.CharField(max_length=1000, blank=True)
    correctanswer2 = models.CharField(max_length=1000, blank=True)

    chatquestion3 = models.CharField(max_length=1000, blank=True)
    answer31 = models.CharField(max_length=1000, blank=True)
    answer32 = models.CharField(max_length=1000, blank=True)
    correctanswer3 = models.CharField(max_length=1000, blank=True)