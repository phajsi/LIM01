from django.urls import path
from .views import SetsView, ProtectedSetsView, UserSetsView, SavedView

urlpatterns = [
    path('sets/<int:pk>', SetsView.as_view(), name='setspk'),
    path('createsets/', ProtectedSetsView.as_view(), name='postsets'),
    path('createsets/<int:pk>', ProtectedSetsView.as_view(),
         name='editsets'),
    path('deletesets/<int:pk>', ProtectedSetsView.as_view(), name='deleteset'),
    path('usersets/', UserSetsView.as_view(), name='usersets'),
    path('saved/', SavedView.as_view(), name='saved'),
    path('saved/<int:pk>', SavedView.as_view(), name='saved')
]
