from django.db import models
from forstaelse.models import Forstaelse
from chat.models import Chat
from rydde_setninger.models import RyddeSetninger
from accounts.models import UserAccount


"""
 @author Maja, Simen
 This file contains all the models related to exercise sets. 
"""


"""
 This is the model for the exercise set. It determines all the fields and the constraints.
 Each exercise set may have up to 5 exercises of each type.
 In addition to the exercise-specific fields, each exercise set needs an owner, title and description.
"""
class Sets(models.Model):
    owner = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)
    forstaelse1 = models.ForeignKey(
        Forstaelse, on_delete=models.SET_NULL, related_name='forstaelse1', blank=True, null=True)
    forstaelse2 = models.ForeignKey(
        Forstaelse, on_delete=models.SET_NULL, related_name='forstaelse2', blank=True, null=True)
    forstaelse3 = models.ForeignKey(
        Forstaelse, on_delete=models.SET_NULL, related_name='forstaelse3', blank=True, null=True)
    forstaelse4 = models.ForeignKey(
        Forstaelse, on_delete=models.SET_NULL, related_name='forstaelse4', blank=True, null=True)
    forstaelse5 = models.ForeignKey(
        Forstaelse, on_delete=models.SET_NULL, related_name='forstaelse5', blank=True, null=True)

    chat1 = models.ForeignKey(
        Chat, on_delete=models.SET_NULL, related_name='chat1', blank=True, null=True)
    chat2 = models.ForeignKey(
        Chat, on_delete=models.SET_NULL, related_name='chat2', blank=True, null=True)
    chat3 = models.ForeignKey(
        Chat, on_delete=models.SET_NULL, related_name='chat3', blank=True, null=True)
    chat4 = models.ForeignKey(
        Chat, on_delete=models.SET_NULL, related_name='chat4', blank=True, null=True)
    chat5 = models.ForeignKey(
        Chat, on_delete=models.SET_NULL, related_name='chat5', blank=True, null=True)

    ryddeSetninger1 = models.ForeignKey(
        RyddeSetninger, on_delete=models.SET_NULL, related_name='ryddeSetninger1', blank=True, null=True)
    ryddeSetninger2 = models.ForeignKey(
        RyddeSetninger, on_delete=models.SET_NULL, related_name='ryddeSetninger2', blank=True, null=True)
    ryddeSetninger3 = models.ForeignKey(
        RyddeSetninger, on_delete=models.SET_NULL, related_name='ryddeSetninger3', blank=True, null=True)
    ryddeSetninger4 = models.ForeignKey(
        RyddeSetninger, on_delete=models.SET_NULL, related_name='ryddeSetninger4', blank=True, null=True)
    ryddeSetninger5 = models.ForeignKey(
        RyddeSetninger, on_delete=models.SET_NULL, related_name='ryddeSetninger5', blank=True, null=True)


"""
This is the model for the user's saved exercise sets.
Owner and sets must be unique together because it should not be possible to save a set multiple times.
"""
class Saved(models.Model):
    owner = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    sets = models.ForeignKey(Sets, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('owner', 'sets',)


"""
This is the model for the comments related to a exercise set.
"""
class Comment(models.Model):
    owner = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    sets = models.ForeignKey(
        Sets, related_name='comments', on_delete=models.CASCADE)
    comment = models.TextField()
    name = models.CharField(max_length=50, default='')


"""
This is the model for the user rating related to the exercise sets.
Owner and sets must be unique together because it should not be possible to rate a set multiple times.
"""
class Rating(models.Model):
    owner = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    sets = models.ForeignKey(Sets, on_delete=models.CASCADE)
    rating = models.BooleanField()

    class Meta:
        unique_together = ('owner', 'sets',)


"""
This is the model for the user's completed exercise sets.
Owner and sets must be unique together because only the best score will be saved, and not multiple scores.
"""
class Completed(models.Model):
    owner = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    sets = models.ForeignKey(Sets, on_delete=models.CASCADE)
    score = models.CharField(max_length=3)

    class Meta:
        unique_together = ('owner', 'sets',)
