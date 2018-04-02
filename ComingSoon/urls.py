from django.conf.urls import url
from django.views.generic import TemplateView
from . import views

urlpatterns = [url(r'^$', ComingSoonView.as_view(), name='ComingSoon'),]
