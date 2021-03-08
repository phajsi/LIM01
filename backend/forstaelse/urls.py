from django.urls import path
from .views import ForstaelseView, CreateForstaelseView

urlpatterns = [
    path('forstaelse/', ForstaelseView.as_view(), name='forstaelse'),
    path('createforstaelse/', CreateForstaelseView.as_view(), name='createforstaelse')
]