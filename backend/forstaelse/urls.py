from django.urls import path
from .views import ForstaelseView, ProtectedForstaelseView

urlpatterns = [
    path('forstaelse/<int:pk>', ForstaelseView.as_view(), name='forstaelsepk'),
    path('createforstaelse/', ProtectedForstaelseView.as_view(),
         name='createforstaelse'),
    path('createforstaelse/<int:pk>', ProtectedForstaelseView.as_view(),
         name='editforstaelse'),
    path('deleteforstaelse/<int:pk>', ProtectedForstaelseView.as_view(),
         name='deleteforstaelse'),
]
