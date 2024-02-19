from django.urls import path
from .views import (
    get_questions,
    new_submission,
    get_round,
    get_teams
)

urlpatterns = [
    path("teams", get_teams, name="get_teams"),
    path("round/<int:number>", get_round, name="get_round"),
    path("questions/<int:round>", get_questions, name="get_questions"),
    path("submit", new_submission, name="new_submission")
]
