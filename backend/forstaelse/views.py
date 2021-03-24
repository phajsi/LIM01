from rest_framework import status, permissions
from .serializers import ForstaelseSerializer
from .models import Forstaelse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from rest_framework.permissions import IsAdminUser


class ForstaelseView(APIView):
    permission_classes = []

    def get(self, request, pk):
        try:
            getForstaelse = Forstaelse.objects.get(pk=pk)
        except Forstaelse.DoesNotExist:
            return JsonResponse(serializer.errors, status=400)
        serializer = ForstaelseSerializer(getForstaelse)
        return JsonResponse(serializer.data, safe=False)


class CreateForstaelseView(APIView):
    def post(self, request):
        data = JSONParser().parse(request)
        serializer = ForstaelseSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def put(self, request, pk):
        try:
            getForstaelse = Forstaelse.objects.get(pk=pk)
        except Forstaelse.DoesNotExist:
            return JsonResponse(serializer.errors, status=400)
        data = JSONParser().parse(request)
        serializer = ForstaelseSerializer(getForstaelse, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


class DeleteForstaelseView(APIView):
    def delete(self, request, pk):
        serializer = ForstaelseSerializer()
        try:
            getForstaelse = Forstaelse.objects.get(pk=pk)
        except Forstaelse.DoesNotExist:
            return JsonResponse(serializer.errors, status=400)
        getForstaelse.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)
