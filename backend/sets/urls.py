from django.urls import path
from .views import SetsView, ProtectedSetsView, UserSetsView, SavedView, CommentView, UserCommentView, getRatingView, RatingView, UserSavedView

urlpatterns = [
    path('sets/<int:pk>', SetsView.as_view(), name='setspk'),
    path('createsets/', ProtectedSetsView.as_view(), name='postsets'),
    path('createsets/<int:pk>', ProtectedSetsView.as_view(),
         name='editsets'),
    path('deletesets/<int:pk>', ProtectedSetsView.as_view(), name='deleteset'),
    path('usersets/', UserSetsView.as_view(), name='usersets'),
    path('saved/', SavedView.as_view(), name='saved'),
    path('saved/<int:pk>', SavedView.as_view(), name='saved'),
    path('usersaved/<int:pk>', UserSavedView.as_view(), name='userSaved'),
    path('comment/<int:pk>', CommentView.as_view(), name='comment'),
    path('usercomment/', UserCommentView.as_view(), name='usercomment'),
    path('usercomment/<int:pk>', UserCommentView.as_view(), name='usercomment'),
    path('getrating/<int:pk>', getRatingView.as_view(), name='rating'),
    path('rating/<int:pk>', RatingView.as_view(), name='rating'),
    path('rating/', RatingView.as_view(), name='rating'),
]
