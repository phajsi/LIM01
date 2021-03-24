from django.urls import path
from .views import SetsView, PostSetsView, UserSetsView

urlpatterns = [
    path('sets/<int:pk>', SetsView.as_view(), name='setspk'),
    path('createsets/', PostSetsView.as_view(), name='postsets'),
    path('usersets/', UserSetsView.as_view(), name='usersets'),
]
