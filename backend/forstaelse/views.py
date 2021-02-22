from rest_framework import status, permissions
from .serializers import ForstaelseSerializer
from .models import Forstaelse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from rest_framework.permissions import IsAdminUser

class ForstaelseView(APIView):
    def get(self, request):
        forstaelse = Forstaelse.objects.all()
        serializer = ForstaelseSerializer(forstaelse, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        data = JSONParser().parse(request)
        serializer = ForstaelseSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    
