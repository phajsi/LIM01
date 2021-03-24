from django.urls import path
from .views import ChatView, CreateChatView, DeleteChatView

urlpatterns = [
    path('chat/', ChatView.as_view(), name='chat'),
    path('createchat/', CreateChatView.as_view(), name='createchat'),
    path('createchat/<int:pk>', CreateChatView.as_view(),
         name='editchat'),
    path('deletechat/<int:pk>', DeleteChatView.as_view(), name='deletechat'),
    path('chat/<int:pk>', ChatView.as_view(), name='chat'),
]
