from django.urls import path
from .views import RyddeSetningerView, CreateRyddeSetningerView

urlpatterns = [
    path('rydde_setninger/', RyddeSetningerView.as_view(), name='rydde_setninger'),
    path('create_rydde_setninger/', CreateRyddeSetningerView.as_view(),
         name='create_rydde_setninger'),
    path('rydde_setninger/<int:pk>', RyddeSetningerView.as_view(), name='rydde_setningerpk'),
]
