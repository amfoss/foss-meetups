# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-04-02 18:57
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CallForPaper',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('topic', models.CharField(max_length=300)),
                ('abstract', models.TextField()),
                ('duration', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Meetup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(auto_created=True)),
                ('name', models.CharField(max_length=100)),
                ('slug', models.CharField(max_length=100)),
                ('date', models.DateTimeField()),
                ('location', models.CharField(max_length=500)),
                ('tag_line', models.CharField(max_length=300)),
                ('description', models.TextField()),
                ('coming_soon', models.BooleanField(default=False)),
                ('is_open', models.BooleanField(default=False)),
                ('is_open_till', models.DateTimeField()),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('team', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='team', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MeetupComments',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.TextField(max_length=500)),
                ('meetup', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Meetup')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MeetupPhoto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to=b'')),
                ('meetup', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Meetup')),
            ],
        ),
        migrations.CreateModel(
            name='NotifyMeEmail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('meetup', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Meetup')),
            ],
        ),
        migrations.CreateModel(
            name='Speaker',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_number', models.CharField(max_length=50)),
                ('organisation', models.CharField(max_length=200)),
                ('designation', models.CharField(max_length=200)),
                ('github', models.URLField()),
                ('about', models.TextField(blank=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Talk',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('tag_line', models.CharField(max_length=500)),
                ('description', models.TextField(blank=True)),
                ('start', models.DateTimeField()),
                ('end', models.DateTimeField()),
                ('meetup', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Meetup')),
                ('speaker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Speaker')),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(auto_created=True)),
                ('team_name', models.CharField(max_length=100)),
                ('tag_line', models.CharField(max_length=300)),
                ('description', models.TextField()),
                ('location', models.CharField(max_length=500)),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('web_page', models.URLField(blank=True)),
                ('github', models.URLField(blank=True)),
                ('twitter', models.URLField(blank=True)),
                ('facebook', models.URLField(blank=True)),
                ('instagram', models.URLField(blank=True)),
                ('irc', models.CharField(blank=True, max_length=100)),
                ('admin', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='admin', to=settings.AUTH_USER_MODEL)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='created_by', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='callforpaper',
            name='meetup',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Meetup'),
        ),
        migrations.AddField(
            model_name='callforpaper',
            name='speaker',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Speaker'),
        ),
    ]
