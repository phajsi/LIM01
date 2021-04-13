from rest_framework import status, permissions
from .serializers import SetsSerializer, SavedSerializer, CommentSerializer, RatingSerializer
from .models import Sets, Saved, Comment, Rating
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response


class SetsView(APIView):
    permission_classes = []

    def get(self, request, pk):
        try:
            getSet = Sets.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        serializer = SetsSerializer(getSet)
        return JsonResponse(serializer.data, safe=False)


class ProtectedSetsView(APIView):
    def post(self, request):
        data = JSONParser().parse(request)
        serializer = SetsSerializer(data=data)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def put(self, request, pk):
        try:
            getSets = Sets.objects.filter(owner=self.request.user).get(pk=pk)
        except ObjectDoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        data = JSONParser().parse(request)
        serializer = SetsSerializer(getSets, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def delete(self, request, pk):
        try:
            getSets = Sets.objects.filter(owner=self.request.user).get(pk=pk)
        except ObjectDoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        getSets.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)


class UserSetsView(APIView):
    def get(self, request):
        getSet = Sets.objects.filter(owner=self.request.user)
        serializer = SetsSerializer(getSet, many=True)
        return JsonResponse(serializer.data, safe=False)


class SavedView(APIView):
    def get(self, request):
        getSaved = Saved.objects.filter(owner=self.request.user)
        serializer = SavedSerializer(getSaved, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        data = JSONParser().parse(request)
        serializer = SavedSerializer(data=data)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def delete(self, request, pk):
        try:
            getSaved = Saved.objects.filter(
                owner=self.request.user).get(sets=pk)
        except ObjectDoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        getSaved.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)


class UserSavedView(APIView):
    def get(self, request, pk):
        try:
            getSaved = Saved.objects.filter(
                owner=self.request.user).get(sets=pk)
        except ObjectDoesNotExist:
            content = {'saved': False}
            return Response(content)
        content = {'saved': True}
        return Response(content)


class CommentView(APIView):
    permission_classes = []

    def get(self, request, pk):
        getComment = Comment.objects.filter(sets=pk)
        serializer = CommentSerializer(getComment, many=True)
        return JsonResponse(serializer.data, safe=False)

class UserCommentView(APIView):
    def get(self, request, pk):
        try:
            getComment = Comment.objects.filter(owner=self.request.user).get(sets=pk)
        except ObjectDoesNotExist:
            HttpResponse(status=status.HTTP_404_NOT_FOUND)
            return Response(content)
        serializer = CommentSerializer(getComment, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        data = JSONParser().parse(request)
        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def delete(self, request, pk):
        try:
            getComment = Comment.objects.filter(owner=self.request.user).get(pk=pk)
        except ObjectDoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        getComment.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

class getRatingView(APIView):
    permission_classes = []
    
    def get(self, request, pk):
        getRatings = Rating.objects.filter(sets=pk)
        ratingCount = getRatings.count()
        upvotes = getRatings.filter(rating=True).count()
        downvotes = getRatings.filter(rating=False).count()
        content = {'ratings': ratingCount,
                   'upvotes': upvotes, 'downvotes': downvotes}
        return Response(content)

class RatingView(APIView):
    def get(self, request, pk):
        try:
            getRating = Rating.objects.filter(
                owner=self.request.user).get(sets=pk)
        except ObjectDoesNotExist:
            content = {'rating': None}
            return Response(content)
        content = {'rating': getRating.rating}
        return Response(content)

    def post(self, request):
        """adds, changes or deletes user rating for a set.

        If a user has not rated this set, the post request will make a new rating.
        If a user has rated the set before and a new rating is sent it will either
        be deleted or changed. 
        """
        data = JSONParser().parse(request)
        setId = data["sets"]
        rating = data["rating"]
        try:
            getRating = Rating.objects.filter(
                owner=self.request.user).get(sets=setId)
        except ObjectDoesNotExist:
            serializer = RatingSerializer(data=data)
            if serializer.is_valid():
                serializer.save(owner=self.request.user)
                return JsonResponse(serializer.data, status=201)
        if (getRating.rating == rating):
            getRating.delete()
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)
        else:
            serializer = RatingSerializer(getRating, data=data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
