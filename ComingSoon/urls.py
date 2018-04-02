from django.conf.urls import url
from ComingSoon import views

urlpatterns = [
    url(r'^$', views.ComingSoonView.as_view(), name='home'),
]
