from rest_framework import serializers
from .models import Sets


class SetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sets
        fields = ('id', 'forstaelse1', 'forstaelse2', 'chat1', 'chat2')
