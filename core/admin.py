from django.contrib import admin

from core.models import Team, Speaker, Meetup, Talk, CallForPaper, NotifyMeEmail

admin.site.register(Team)
admin.site.register(Speaker)
admin.site.register(Meetup)
admin.site.register(Talk)
admin.site.register(CallForPaper)
admin.site.register(NotifyMeEmail)
