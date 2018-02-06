from django.conf.urls import url, include
from django.conf.urls.static import static

from django.contrib.auth import views as auth_views
from meetup import views
from Meetups import settings
from meetup.views import index, upcoming, done, display, comment

urlpatterns = [
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', auth_views.login, {'template_name': 'meetup/login.html'}, name='login'),
    url(r'^index/$', index.as_view()),
    url(r'^create/$', upcoming, name="create"),
    url(r'^done/$', done.as_view(), name="done"),
    url(r'^display/(?P<pk>\d+)/$', display.as_view(), name="display"),
    url(r'^logout/$', auth_views.logout, name="logout"),
    url(r'^comment/(?P<pk>\d+)/$', comment, name="comment"),
]
