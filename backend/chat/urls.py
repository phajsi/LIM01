from django.urls import path
from .views import ChatView, CreateChatView

urlpatterns = [
    path('chat/', ChatView.as_view(), name='chat'),
    path('createchat/', CreateChatView.as_view(), name='createchat')
]