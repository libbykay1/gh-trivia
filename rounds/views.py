from django.http import JsonResponse
from .common.json import ModelEncoder
from .models import (
    Question,
    Submission,
    Round,
    Team
)
from django.views.decorators.http import require_http_methods
import json


class TeamEncoder(ModelEncoder):
    model = Team
    properties = [
        "id",
        "team_name",
        "total_points",
        "round_one_points",
        "round_two_points",
        "round_three_points",
        "round_four_points"
    ]


class RoundEncoder(ModelEncoder):
    model = Round
    properties = [
        "id",
        "number",
        "title",
        "prompt",
        "visible",
        "answers"
    ]


class QuestionListEncoder(ModelEncoder):
    model = Question
    properties = [
        "round",
        "number",
        "text",
        "image",
        "answer"
    ]
    encoders = {
        "round": RoundEncoder(),
    }


class SubmissionEncoder(ModelEncoder):
    model = Submission
    properties = [
        "id",
        "team",
        "double_or_nothing",
        "answer1",
        "answer2",
        "answer3",
        "answer4",
        "answer5",
        "answer6",
        "answer7",
        "answer8",
        "answer9",
        "answer10",
        "round",
        "team_object"
    ]


@require_http_methods(["GET"])
def get_questions(request, round):
    questions = Question.objects.filter(round=round)
    return JsonResponse(
        {"questions": questions},
        encoder=QuestionListEncoder,
    )


@require_http_methods(["GET", "POST"])
def get_teams(request):
    if request.method == "GET":
        teams = Team.objects.all()
        return JsonResponse(
            {"teams": teams},
            encoder=TeamEncoder,
        )
    else:
        content = json.loads(request.body)
        team = Team.objects.create(**content)
        return JsonResponse(
            team,
            encoder=TeamEncoder,
            safe=False
        )


@require_http_methods(["GET"])
def get_round(request, number):
    round = Round.objects.filter(number=number)[0]
    return JsonResponse(
        {"round": round},
        encoder=RoundEncoder,
    )


@require_http_methods(["POST", "GET"])
def new_submission(request):
    if request.method == "GET":
        submissions = Submission.objects.all()
        return JsonResponse(
            {"submissions": submissions},
            encoder=SubmissionEncoder,
        )
    else:
        content = json.loads(request.body)
        submission = Submission.objects.create(**content)
        return JsonResponse(
            submission,
            encoder=SubmissionEncoder,
            safe=False
        )
