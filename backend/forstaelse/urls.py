from django.urls import path
from .views import ForstaelseView, CreateForstaelseView

urlpatterns = [
    path('forstaelse/', ForstaelseView.as_view(), name='forstaelse'),
    path('createforstaelse/', CreateForstaelseView.as_view(),
         name='createforstaelse'),
    path('createforstaelse/<int:pk>', CreateForstaelseView.as_view(),
         name='createforstaelsedelete'),
    path('forstaelse/<int:pk>', ForstaelseView.as_view(), name='forstaelsepk'),
]
