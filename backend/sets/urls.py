from django.urls import path
from .views import SetsView, PostSetsView, UserSetsView, DeleteSetsView

urlpatterns = [
    path('sets/<int:pk>', SetsView.as_view(), name='setspk'),
    path('createsets/', PostSetsView.as_view(), name='postsets'),
    path('createsets/<int:pk>', PostSetsView.as_view(),
         name='editsets'),
    path('usersets/', UserSetsView.as_view(), name='usersets'),
    path('deletesets/<int:pk>', DeleteSetsView.as_view(), name='deleteset'),
]
