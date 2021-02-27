from rest_framework import status, permissions
from .serializers import ChatSerializer
from .models import Chat
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from rest_framework.permissions import IsAdminUser
class ChatView(APIView):
    def get(self, request):
        chat = Chat.objects.all()
        serializer = ChatSerializer(chat, many=True)
        return JsonResponse(serializer.data, safe=False)
    def post(self, request):
        data = JSONParser().parse(request)
        serializer = ChatSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)