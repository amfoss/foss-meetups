from django.contrib.auth.models import User
from django.db import models


class Team(models.Model):
    admin = models.OneToOneField(
        User, on_delete=models.SET_NULL, null=True, related_name='admin')
    name = models.CharField(max_length=100)
    tag_line = models.CharField(max_length=300)
    description = models.TextField()
    location = models.CharField(max_length=500)
    image = models.ImageField(upload_to='images/teams/', blank=True)

    email = models.EmailField(blank=True)
    web_page = models.URLField(blank=True)
    github = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    facebook = models.URLField(blank=True)
    instagram = models.URLField(blank=True)
    irc = models.CharField(max_length=100, blank=True)

    created_date = models.DateTimeField(auto_created=True)
    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name='created_by')

    def __str__(self):
        return self.name


class Speaker(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=50)
    organisation = models.CharField(max_length=200)
    designation = models.CharField(max_length=200)
    github = models.URLField()
    image = models.ImageField(upload_to='images/speakers/', blank=True)

    about = models.TextField(blank=True)

    def __str__(self):
        return self.user.get_full_name()


class Meetup(models.Model):
    name = models.CharField(max_length=100)
    slug = models.CharField(max_length=100)
    date = models.DateTimeField()
    location = models.CharField(max_length=500)
    tag_line = models.CharField(max_length=300)
    description = models.TextField()
    image = models.ImageField(upload_to='images/meetups/', blank=True)

    coming_soon = models.BooleanField(default=False)
    is_open = models.BooleanField(default=False)
    is_open_till = models.DateTimeField()

    team = models.ForeignKey(
        Team, on_delete=models.SET_NULL, null=True, related_name='team')

    created_date = models.DateTimeField(auto_created=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class Talk(models.Model):
    meetup = models.ForeignKey(Meetup, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    tag_line = models.CharField(max_length=500)
    description = models.TextField(blank=True)
    speaker = models.ForeignKey(Speaker, on_delete=models.CASCADE)

    start = models.DateTimeField()
    end = models.DateTimeField()

    def __str__(self):
        return self.name


class MeetupPhoto(models.Model):
    meetup = models.ForeignKey(Meetup, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='meetups/pics/', blank=True)

    def __str__(self):
        return self.meetup.name


class MeetupComments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    meetup = models.ForeignKey(Meetup, on_delete=models.CASCADE)
    # parent = models.IntegerField(default=0)
    comment = models.TextField(max_length=500)

    def __str__(self):
        return self.meetup.name


class CallForProposals(models.Model):
    speaker = models.ForeignKey(Speaker, on_delete=models.CASCADE)
    meetup = models.ForeignKey(Meetup, on_delete=models.CASCADE)
    topic = models.CharField(max_length=300)
    abstract = models.TextField()
    duration = models.IntegerField()

    def __str__(self):
        return self.topic


class NotifyMeEmail(models.Model):
    meetup = models.ForeignKey(Meetup, on_delete=models.CASCADE)
    email = models.EmailField()
