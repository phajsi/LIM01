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


"""
 Rydde_setninger view without permission class meaning it is accessible to anyone. 
 Only allows get requests.
"""
class RyddeSetningerView(APIView):
    # Receives a primary key in the url and returns the rydde_setninger object with the corresponding key or 404 error.
    permission_classes = []

    def get(self, request, pk):
        try:
            getRyddeSetninger = RyddeSetninger.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        serializer = RyddeSetningerSerializer(getRyddeSetninger)
        return JsonResponse(serializer.data, safe=False)


"""
Protected rydde_setninger view which means requests need to include a valid token. 
Allows post, put and delete requests.
"""
class ProtectedRyddeSetningerView(APIView):
    # Adds new rydde_setninger object to the database model based on request body if it can be serialized correctly.
    def post(self, request):
        data = JSONParser().parse(request)
        serializer = RyddeSetningerSerializer(data=data)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    # Updates an existing rydde_setninger object if it exists and it can be serialized.
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

    # Deletes an existing forstarydde_setninger else object if it exists, else 404 error is returned.
    def delete(self, request, pk):
        try:
            getRyddeSetninger = RyddeSetninger.objects.filter(
                owner=self.request.user).get(pk=pk)
        except ObjectDoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        getRyddeSetninger.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)
