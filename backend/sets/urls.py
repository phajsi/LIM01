from django.urls import path
from .views import SetsView, PostSetsView

urlpatterns = [
    path('sets/<int:pk>', SetsView.as_view(), name='setspk'),
    path('createsets/', PostSetsView.as_view(), name='postsets'),
]
