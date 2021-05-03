from django.db import models
from accounts.models import UserAccount


"""
 @author Phajsi, Simen
 This is the model for the forstaelse exercise. It determines all the fields and the constraints.
 Each forstaelse exercise may have up to 3 tasks, but only 1 is required.
 In addition to the task-specific fields, each exercise needs an owner which is a foreign key
 related to the account model. 
"""


class Forstaelse(models.Model):
    ANSWER_STATE = (
        ('true', 'true'),
        ('false', 'false')
    )

    owner = models.ForeignKey(UserAccount, on_delete=models.CASCADE)

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
