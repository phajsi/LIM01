from rest_framework import status, permissions
from .serializers import RyddeSetningerSerializer
from .models import RyddeSetninger
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ObjectDoesNotExist

"""
@author Phajsi, Julie, Simen
"""


class RyddeSetningerView(APIView):
    permission_classes = []

    def get(self, request, pk):
        try:
            getRyddeSetninger = RyddeSetninger.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        serializer = RyddeSetningerSerializer(getRyddeSetninger)
        return JsonResponse(serializer.data, safe=False)


class ProtectedRyddeSetningerView(APIView):
    def post(self, request):
        data = JSONParser().parse(request)
        serializer = RyddeSetningerSerializer(data=data)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def put(self, request, pk):
        try:
            getRyddeSetninger = RyddeSetninger.objects.filter(
                owner=self.request.user).get(pk=pk)
        except ObjectDoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        data = JSONParser().parse(request)
        serializer = RyddeSetningerSerializer(getRyddeSetninger, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def delete(self, request, pk):
        try:
            getRyddeSetninger = RyddeSetninger.objects.filter(
                owner=self.request.user).get(pk=pk)
        except ObjectDoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        getRyddeSetninger.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)
