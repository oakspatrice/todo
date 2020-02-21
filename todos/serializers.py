from rest_framework import serializers
from .models import Todo
from django.contrib.auth.models import User


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'title',
            'description',
            'owner',
            'email',
            'sms',
            'todo_created_date',
            'todo_due_date',
            'todo_finished_date',
            'todo_status'
        )
        model = Todo



class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
        )
