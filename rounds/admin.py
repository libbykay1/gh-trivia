from django.contrib import admin
from .models import (
    Team,
    Submission,
    Question,
    Round
)


@admin.register(Round)
class RoundAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "number",
        "date_used"
    )


@admin.register(Question)
class QuestionsAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "round",
        "number",
    )


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "team_name",
        "total_points",
        "round_one_points",
        "round_two_points",
        "round_three_points",
        "round_four_points",
    )


@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "team",
        "round"
    )
