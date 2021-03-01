from rest_framework import serializers
from .models import Chat

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id', 'answer1', 'answer2', 'correctanswer', 'chatquestion', 'defaultreply', 'userreply')