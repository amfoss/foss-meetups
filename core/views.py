from django.http import HttpResponseForbidden
from django.shortcuts import render
from django.views.generic import DetailView
from django.views.generic.list import ListView

from core.forms import NotifyMeForm
from core.models import Meetup, NotifyMeEmail


class MeetupListView(ListView):
    model = Meetup


class MeetupDetailView(DetailView):
    model = Meetup
    form_class = NotifyMeForm
    template_name = 'core/meetup_detail.html'

    def get_context_data(self, **kwargs):
        context = super(MeetupDetailView, self).get_context_data()
        if self.get_object().coming_soon:
            context['form'] = self.form_class()
        return context

    def get_template_names(self):
        if self.get_object().coming_soon:
            self.template_name = 'core/coming_soon.html'
        return self.template_name

    def post(self, request, *args, **kwargs):
        if not self.get_object().coming_soon:
            # raise an error
            return HttpResponseForbidden()

        form = self.form_class(request.POST)

        self.object = self.get_object()
        context = self.get_context_data()

        if form.is_valid():
            if NotifyMeEmail.objects.filter(meetup=self.object, email=form.cleaned_data.get('email')).exists():
                context['duplicate'] = True
            else:
                notify_me_email = form.save(commit=False)
                notify_me_email.meetup = self.object
                notify_me_email.save()
                context['success'] = True

        return render(request, self.get_template_names(), context)
