from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.contrib import admin

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('admin/', admin.site.urls),
    path('api/', include('forstaelse.urls')),
    path('api/', include('chat.urls')),
    path('api/', include('sets.urls')),
    path('api/', include('rydde_setninger.urls')),
]

urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'))]
