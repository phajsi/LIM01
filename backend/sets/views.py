from rest_framework import status, permissions
from .serializers import SetsSerializer
from .models import Sets
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse


class SetsView(APIView):
    permission_classes = []

    def get(self, request, pk):
        try:
            getSet = Sets.objects.get(pk=pk)
        except Sets.DoesNotExist:
            return JsonResponse(serializer.errors, status=400)
        serializer = SetsSerializer(getSet)
        return JsonResponse(serializer.data, safe=False)


class PostSetsView(APIView):
    def post(self, request):
        data = JSONParser().parse(request)
        serializer = SetsSerializer(data=data)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


class UserSetsView(APIView):
    def get(self, request):
        getSet = Sets.objects.filter(owner=self.request.user)
        serializer = SetsSerializer(getSet, many=True)
        return JsonResponse(serializer.data, safe=False)
