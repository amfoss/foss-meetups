from django.views.generic.detail import DetailView
from django.views.generic.list import ListView

from core.models import Meetup


class MeetupListView(ListView):
    model = Meetup


class MeetupDetailView(DetailView):
    model = Meetup
    slug_url_kwarg = 'slug'

    def get_template_names(self):
        if self.get_object().comming_soon:
            template_name = 'core/comming_soon.html'
