from rest_framework import status, permissions
from .serializers import RyddeSetningerSerializer
from .models import RyddeSetninger
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from rest_framework.permissions import IsAdminUser

# Create your views here.


class RyddeSetningerView(APIView):
    permission_classes = []

    def get(self, request, pk):
        try:
            getRyddeSetninger = RyddeSetninger.objects.get(pk=pk)
        except RyddeSetninger.DoesNotExist:
            return JsonResponse(serializer.errors, status=400)
        serializer = RyddeSetningerSerializer(getRyddeSetninger)
        return JsonResponse(serializer.data, safe=False)


class CreateRyddeSetningerView(APIView):
    def post(self, request):
        data = JSONParser().parse(request)
        serializer = RyddeSetningerSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def put(self, request, pk):
        try:
            getRyddeSetninger = RyddeSetninger.objects.get(pk=pk)
        except RyddeSetninger.DoesNotExist:
            return JsonResponse(serializer.errors, status=400)
        data = JSONParser().parse(request)
        serializer = RyddeSetningerSerializer(getRyddeSetninger, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


class DeleteRyddeSetningerView(APIView):
    def delete(self, request, pk):
        serializer = RyddeSetningerSerializer()
        try:
            getRyddeSetninger = RyddeSetninger.objects.get(pk=pk)
        except RyddeSetninger.DoesNotExist:
            return JsonResponse(serializer.errors, status=400)
        getRyddeSetninger.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)
