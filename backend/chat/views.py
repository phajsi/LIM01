from rest_framework import status, permissions
from .serializers import ChatSerializer
from .models import Chat
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ObjectDoesNotExist


class ChatView(APIView):
    permission_classes = []

    def get(self, request, pk):
        try:
            getChat = Chat.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        serializer = ChatSerializer(getChat)
        return JsonResponse(serializer.data, safe=False)


class ProtectedChatView(APIView):
    def post(self, request):
        data = JSONParser().parse(request)
        serializer = ChatSerializer(data=data)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def put(self, request, pk):
        try:
            getChat = Chat.objects.filter(owner=self.request.user).get(pk=pk)
        except ObjectDoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        data = JSONParser().parse(request)
        serializer = ChatSerializer(getChat, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def delete(self, request, pk):
        try:
            getChat = Chat.objects.filter(owner=self.request.user).get(pk=pk)
        except ObjectDoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        getChat.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)
