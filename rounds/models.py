from django.db import models


class Question(models.Model):
    text = models.TextField()
    answer = models.CharField(max_length=200)
    round = models.SmallIntegerField()
    number = models.SmallIntegerField()
    points = models.SmallIntegerField()


class Round(models.Model):
    number = models.SmallIntegerField()
    title = models.CharField(max_length=200)
    prompt = models.TextField()
    visible = models.BooleanField(default=False)
    date_used = models.DateField()


class Team(models.Model):
    team_name = models.CharField(max_length=200)
    round_one_points = models.SmallIntegerField(default=0)
    round_two_points = models.SmallIntegerField(default=0)
    round_three_points = models.SmallIntegerField(default=0)
    round_four_points = models.SmallIntegerField(default=0)
    total_points = models.SmallIntegerField(default=0)

    class Meta:
        ordering = ["-total_points"]


class Submission(models.Model):
    team = models.CharField(max_length=200)
    double_or_nothing = models.BooleanField(default=False)
    answer1 = models.CharField(max_length=200, null=True)
    answer2 = models.CharField(max_length=200, null=True)
    answer3 = models.CharField(max_length=200, null=True)
    answer4 = models.CharField(max_length=200, null=True)
    answer5 = models.CharField(max_length=200, null=True)
    answer6 = models.CharField(max_length=200, null=True)
    answer7 = models.CharField(max_length=200, null=True)
    answer8 = models.CharField(max_length=200, null=True)
    answer9 = models.CharField(max_length=200, null=True)
    answer10 = models.CharField(max_length=200, null=True)
    round = models.SmallIntegerField(null=True)
