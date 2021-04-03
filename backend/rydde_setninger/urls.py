from django.urls import path
from .views import RyddeSetningerView, ProtectedRyddeSetningerView

urlpatterns = [
    path('rydde_setninger/<int:pk>',
         RyddeSetningerView.as_view(), name='rydde_setningerpk'),
    path('create_rydde_setninger/', ProtectedRyddeSetningerView.as_view(),
         name='create_rydde_setninger'),
    path('create_rydde_setninger/<int:pk>', ProtectedRyddeSetningerView.as_view(),
         name='editryddesetninger'),
    path('delete_rydde_setninger/<int:pk>', ProtectedRyddeSetningerView.as_view(),
         name='delete_rydde_setninger'),
]
