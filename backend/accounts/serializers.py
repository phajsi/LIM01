from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

"""
 This code is based on a youtube tutorial:
 Django & React JWT Authentication by Bryan Dunn
 https://www.youtube.com/watch?v=QFDyXWRYQjY&list=PLJRGQoqpRwdfoa9591BcUS6NmMpZcvFsM
 @author Phajsi, Simen
"""

User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'name', 'password')
