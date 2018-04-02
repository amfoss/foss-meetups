from django.contrib.auth.models import User
from django.db import models


class Team(models.Model):
    admin = models.OneToOneField(User, on_delete=models.SET_NULL)
    team_name = models.CharField(max_length=100)
    tag_line = models.CharField(max_length=300)
    description = models.TextField()
    location = models.CharField(max_length=500)

    email = models.EmailField(blank=True)
    web_page = models.URLField(blank=True)
    github = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    facebook = models.URLField(blank=True)
    instagram = models.URLField(blank=True)
    irc = models.CharField(max_length=100, blank=True)

    created_date = models.DateTimeField(auto_created=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL)

    def __str__(self):
        return self.team_name


class Meetup(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateTimeField()
    location = models.CharField(max_length=500)
    tag_line = models.CharField(max_length=300)
    description = models.TextField()

    is_open = models.BooleanField(default=False)
    is_open_till = models.DateTimeField()

    team = models.ForeignKey(User, on_delete=models.SET_NULL)

    created_date = models.DateTimeField(auto_created=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name

