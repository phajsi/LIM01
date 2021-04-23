from rest_framework import status, permissions
from .serializers import ForstaelseSerializer
from .models import Forstaelse
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ObjectDoesNotExist

"""
Forstaelse view without permission class meaning it is accessible to anyone. 
Only allows get requests 
"""


class ForstaelseView(APIView):
    permission_classes = []
    # receives a primary key in the url and returns the forstaelse object with the corresponding key or 404 error.

    def get(self, request, pk):
        try:
            getForstaelse = Forstaelse.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        serializer = ForstaelseSerializer(getForstaelse)
        return JsonResponse(serializer.data, safe=False)


"""
Protected forstaelse view which means requests need to include a valid token. 
allows post, put and delete requests.
"""


class ProtectedForstaelseView(APIView):
    # adds new forstaelse object to the database model based on request body if it can be serialized correctly.
    def post(self, request):
        data = JSONParser().parse(request)
        serializer = ForstaelseSerializer(data=data)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    # updates an existing forstaelse object if it exists and it can be serialized
    def put(self, request, pk):
        try:
            getForstaelse = Forstaelse.objects.filter(
                owner=self.request.user).get(pk=pk)
        except ObjectDoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        data = JSONParser().parse(request)
        serializer = ForstaelseSerializer(getForstaelse, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    # deletes an existing forstaelse object if it exists, else 404 error is returned
    def delete(self, request, pk):
        try:
            getForstaelse = Forstaelse.objects.filter(
                owner=self.request.user).get(pk=pk)
        except ObjectDoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        getForstaelse.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)
