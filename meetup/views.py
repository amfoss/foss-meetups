# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.views.generic import ListView, DetailView
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth import authenticate, login
from meetup.forms import UserForm
from datetime import datetime
# Create your views here.
from meetup.models import UpComingMeetups, Pastevents
from django.shortcuts import render


class index(ListView):
    model = UpComingMeetups
    template_name = 'meetup/index.html'

    def get_context_data(self, **kwargs):
        context = super(index, self).get_context_data(**kwargs)
        d = datetime.now()
        context['now'] = d.date()
        return context

class done(ListView):
    model = UpComingMeetups
    template_name = 'meetup/display.html'

    def get_context_data(self, **kwargs):
        context = super(done, self).get_context_data(**kwargs)
        d = datetime.now()
        context['now'] = d.date()
        return context



def register(request):
    if request.method == 'POST':
        user_form = UserForm(data=request.POST)
        if user_form.is_valid():
            user = user_form.save(commit=False)
            user.user = request.user
            user.set_password(user.password)
            user.save()
            registered = True
            if registered == True:
                return HttpResponseRedirect('/meetup/login/')
            else:
                return HttpResponse("Username already in use.")
    else:
        user_form = UserForm()
    return render(request,'meetup/register.html',{})

def upcoming(request):
    if request.method == 'POST':
        heading = request.POST.get('heading')
        topic = request.POST.get('topic')
        speaker = request.POST.get('speaker')
        description = request.POST.get('description')
        date = request.POST.get('date')
        time = request.POST.get('time')
        venue = request.POST.get('venue')
        u = UpComingMeetups.objects.create(Heading = heading, Topic = topic, Speaker = speaker, Description = description,
                                           Date = date, Time = time, Venue = venue)
        u.save()
        return HttpResponseRedirect('/meetup/index')
    return render(request, 'meetup/upcoming.html', {})

class display(DetailView):
    model = UpComingMeetups
    template_name = 'meetup/pasteventdetail.html'

    def get_context_data(self, **kwargs):
        context = super(display,self).get_context_data(**kwargs)
        context['list'] = Pastevents.objects.all()
        return context

def comment(request,pk):
    a = UpComingMeetups.objects.get(id=pk)
    if request.method == "POST":
        pastevent = UpComingMeetups.objects.get(id=pk)
        user = request.user
        comments = request.POST.get('comment')
        u = Pastevents.objects.create(pastevents=pastevent, user = user, comment=comments)
        u.save()
        return HttpResponseRedirect('/meetup/display/%d' %a.id)
    return render(request,'meetup/pasteventdetail.html',{'a':a})
