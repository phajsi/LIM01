from rest_framework import status, permissions
from .serializers import ChatSerializer
from .models import Chat
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ObjectDoesNotExist

"""
Chat view without permission class meaning it is accessible to anyone. 
Only allows get requests 
"""


class ChatView(APIView):
    permission_classes = []
    # receives a primary key in the url and returns the chat object with the corresponding key or 404 error.

    def get(self, request, pk):
        try:
            getChat = Chat.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        serializer = ChatSerializer(getChat)
        return JsonResponse(serializer.data, safe=False)


"""
Protected chat view which means requests need to include a valid token. 
allows post, put and delete requests.
"""


class ProtectedChatView(APIView):
    # adds new chat object to the database model based on request body if it can be serialized correctly.
    def post(self, request):
        data = JSONParser().parse(request)
        serializer = ChatSerializer(data=data)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    # updates an existing chat object if it exists and it can be serialized
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

    # deletes an existing chat object if it exists, else 404 error is returned
    def delete(self, request, pk):
        try:
            getChat = Chat.objects.filter(owner=self.request.user).get(pk=pk)
        except ObjectDoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        getChat.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)
