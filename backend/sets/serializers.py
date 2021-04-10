from rest_framework import serializers
from .models import Sets, Saved, Feedback, Rating


class SetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sets
        fields = ('id', 'title', 'description', 'forstaelse1', 'forstaelse2', 'forstaelse3', 'forstaelse4',
                  'forstaelse5', 'chat1', 'chat2', 'chat3', 'chat4', 'chat5',
                  'ryddeSetninger1', 'ryddeSetninger2', 'ryddeSetninger3', 'ryddeSetninger4',
                  'ryddeSetninger5')
        owner = serializers.ReadOnlyField(source='owner.email')


class SavedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Saved
        fields = ('id', 'sets')
        owner = serializers.ReadOnlyField(source='owner.email')


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('id', 'sets', 'rating')
        owner = serializers.ReadOnlyField(source='owner.email')
