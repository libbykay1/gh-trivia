from django.http import JsonResponse
from .common.json import ModelEncoder
from .models import (
    Question,
    Submission,
    Round
)
from django.views.decorators.http import require_http_methods
import json


class RoundEncoder(ModelEncoder):
    model = Round
    properties = [
        "id",
        "number",
        "title",
        "prompt",
        "visible",
        "answers_visible"
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
        "round"
    ]


@require_http_methods(["GET"])
def get_questions(request, round):
    questions = Question.objects.filter(round=round)
    return JsonResponse(
        {"questions": questions},
        encoder=QuestionListEncoder,
    )


@require_http_methods(["GET"])
def get_round(request, number):
    round = Round.objects.filter(number=number)[0]
    return JsonResponse(
        {"round": round},
        encoder=RoundEncoder,
    )


@require_http_methods(["POST"])
def new_submission(request):
    content = json.loads(request.body)
    submission = Submission.objects.create(**content)
    return JsonResponse(
        submission,
        encoder=SubmissionEncoder,
        safe=False
    )
