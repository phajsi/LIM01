from django.urls import path
from .views import ChatView, ProtectedChatView

urlpatterns = [
    path('chat/<int:pk>', ChatView.as_view(), name='chat'),
    path('createchat/', ProtectedChatView.as_view(), name='createchat'),
    path('createchat/<int:pk>', ProtectedChatView.as_view(),
         name='editchat'),
    path('deletechat/<int:pk>', ProtectedChatView.as_view(), name='deletechat'),
]
