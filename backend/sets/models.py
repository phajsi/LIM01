from django.db import models
from forstaelse.models import Forstaelse
from chat.models import Chat

# Create your models here.


class Sets(models.Model):

    forstaelse1 = models.ForeignKey(
        Forstaelse, on_delete=models.CASCADE, related_name='forstaelse1', blank=True, null=True)
    forstaelse2 = models.ForeignKey(
        Forstaelse, on_delete=models.CASCADE, related_name='forstaelse2', blank=True, null=True)
    forstaelse3 = models.ForeignKey(
        Forstaelse, on_delete=models.CASCADE, related_name='forstaelse3', blank=True, null=True)
    forstaelse4 = models.ForeignKey(
        Forstaelse, on_delete=models.CASCADE, related_name='forstaelse4', blank=True, null=True)
    forstaelse5 = models.ForeignKey(
        Forstaelse, on_delete=models.CASCADE, related_name='forstaelse5', blank=True, null=True)
    chat1 = models.ForeignKey(
        Chat, on_delete=models.CASCADE, related_name='chat1', blank=True, null=True)
    chat2 = models.ForeignKey(
        Chat, on_delete=models.CASCADE, related_name='chat2', blank=True, null=True)
    chat3 = models.ForeignKey(
        Chat, on_delete=models.CASCADE, related_name='chat3', blank=True, null=True)
    chat4 = models.ForeignKey(
        Chat, on_delete=models.CASCADE, related_name='chat4', blank=True, null=True)
    chat5 = models.ForeignKey(
        Chat, on_delete=models.CASCADE, related_name='chat5', blank=True, null=True)
    
