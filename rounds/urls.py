from django.urls import path
from .views import (
    get_questions,
    new_submission,
    get_round
)

urlpatterns = [
    path("round/<int:number>", get_round, name="get_round"),
    path("questions/<int:round>", get_questions, name="get_questions"),
    path("submit", new_submission, name="new_submission")
]
