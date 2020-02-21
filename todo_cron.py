from .models import Todo
from django.core.mail import send_mail
from django_cron import CronJobBase, Schedule

def every_minute():
    send_mail(
        'Mail subject',
        'this is the mail message',
        'testing@informationparlour.com',
        ['oakspatrice@gmail.com', 'leotechmedia@yahoo.com'],
        fail_silently=False,
        auth_user= "testing@informationparlour.com",
        auth_password="parakletos",
        )
