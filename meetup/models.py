# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models

# Create your models here.
TOPIC_CHOICES = (
    ('Technical Presentation', 'Technical Presentation'),
    ('Non-Technical Presentation', 'Non-Technical Presentation'),
    ('Talks', 'Talks'),
)

class UpComingMeetups(models.Model):
    Heading = models.CharField(max_length=100)
    Topic = models.CharField(choices=TOPIC_CHOICES, max_length=50, null=True)
    Speaker = models.CharField(max_length=50)
    Description = models.CharField(max_length=500)
    Date = models.DateField(default=None)
    Time = models.TimeField(default=None)
    Venue = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.Heading

class Pastevents(models.Model):
    pastevents = models.ForeignKey(UpComingMeetups, on_delete=models.CASCADE, default=0)
    comment = models.CharField(max_length=10000)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=0)

    def __str__(self):
        return self.pastevents.Heading
