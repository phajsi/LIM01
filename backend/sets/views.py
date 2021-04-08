from rest_framework import status, permissions
from .serializers import SetsSerializer, SavedSerializer, FeedbackSerializer, RatingSerializer
from .models import Sets, Saved, Feedback, Rating
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
            getSaved = Saved.objects.filter(owner=self.request.user).get(pk=pk)
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
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        serializer = SavedSerializer(getSaved)
        return JsonResponse(serializer.data, safe=False)


class FeedbackView(APIView):
    permission_classes = []

    def get(self, request):
        getFeedback = Feedback.objects.all()
        serializer = FeedbackSerializer(getFeedback, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        data = JSONParser().parse(request)
        serializer = FeedbackSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


class RatingView(APIView):
    def get(self, request, pk):
        getRatings = Rating.objects.filter(sets=pk)
        ratingCount = getRatings.count()
        upvotes = getRatings.filter(rating=True).count()
        downvotes = getRatings.filter(rating=False).count()
        percentage = (upvotes/ratingCount)*100
        content = {'ratings': ratingCount,
                   'upvotes': upvotes, 'downvotes': downvotes, 'percentage': percentage}
        return Response(content)

    def post(self, request):
        data = JSONParser().parse(request)
        serializer = RatingSerializer(data=data)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def delete(self, request, pk):
        try:
            getRating = Rating.objects.filter(
                owner=self.request.user).get(pk=pk)
        except ObjectDoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        getRating.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)


class UserRatingView(APIView):
    def get(self, request, pk):
        try:
            getRating = Rating.objects.filter(
                owner=self.request.user).get(sets=pk)
        except ObjectDoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        serializer = RatingSerializer(getRating)
        return JsonResponse(serializer.data, safe=False)
