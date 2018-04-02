from django import forms

from core.models import NotifyMeEmail


class NotifyMeForm(forms.ModelForm):

    class Meta:
        model = NotifyMeEmail
        fields = ['email']
