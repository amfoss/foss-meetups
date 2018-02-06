# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from meetup.models import UpComingMeetups, Pastevents

admin.site.register(UpComingMeetups)
admin.site.register(Pastevents)
