from django.db import models
from django.contrib.auth.models import User
import datetime




class Todo(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null = True)
    email= models.TextField(default="no")
    sms = models.TextField(default="no")
    todo_created_date = models.DateTimeField(auto_now_add = True)
    todo_due_date = models.DateField()
    todo_finished_date = models.DateField(null = True)
    todo_status = models.TextField(default="Yet to be Completed")

    def __str__(self):
        """A string representation of the model."""
        return self.title

# Create your models here.
