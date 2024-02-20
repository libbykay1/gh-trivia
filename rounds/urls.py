from django.urls import path
from .views import (
    get_questions,
    new_submission,
    get_round,
    get_teams,
    get_round_submissions,
    update_scores,
    make_visible
)

urlpatterns = [
    path("teams", get_teams, name="get_teams"),
    path("round/<int:number>", get_round, name="get_round"),
    path("questions/<int:round>", get_questions, name="get_questions"),
    path("submit", new_submission, name="new_submission"),
    path(
        "submissions/<int:round>",
        get_round_submissions,
        name="get_round_submissions"
    ),
    path("teams/edit/<int:id>", update_scores, name="update_scores"),
    path("visible/<int:round>", make_visible, name="make_visible"),
]
