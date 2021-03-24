from rest_framework import serializers
from .models import Sets


class SetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sets
        fields = ('id', 'forstaelse1', 'forstaelse2', 'forstaelse3', 'forstaelse4',
                  'forstaelse5', 'chat1', 'chat2', 'chat3', 'chat4', 'chat5',
                  'ryddeSetninger1', 'ryddeSetninger2', 'ryddeSetninger3', 'ryddeSetninger4',
                  'ryddeSetninger5')
        owner = serializers.ReadOnlyField(source='owner.email')
