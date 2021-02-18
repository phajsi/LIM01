from django.urls import path
from .views import ForstaelseView

urlpatterns = [
    path('forstaelse/', ForstaelseView.as_view(), name='forstaelse')
]